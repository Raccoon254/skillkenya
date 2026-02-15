import nodemailer from 'nodemailer';
import mjml2html from 'mjml';
import Handlebars from 'handlebars';
import { prisma } from '../prisma';
import type { NotificationType } from '@prisma/client';
import {
	SMTP_HOST,
	SMTP_PORT,
	SMTP_SECURE,
	SMTP_USER,
	SMTP_PASS,
	EMAIL_FROM
} from '$env/static/private';
import { PUBLIC_BASE_URL } from '$env/static/public';

// Email configuration
const EMAIL_NAME = 'SkillKenya';

// Create nodemailer transporter with proper timeouts
export const transporter = nodemailer.createTransport({
	host: SMTP_HOST,
	port: parseInt(SMTP_PORT || '587'),
	secure: SMTP_SECURE === 'true',
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASS
	},
	connectionTimeout: 10000,
	greetingTimeout: 10000,
	socketTimeout: 15000
});

/**
 * Compile MJML template with Handlebars
 */
export function compileMJMLTemplate(mjmlTemplate: string, data: Record<string, any>): string {
	// Compile with Handlebars first
	const template = Handlebars.compile(mjmlTemplate);
	const mjmlWithData = template(data);

	// Convert MJML to HTML
	const { html, errors } = mjml2html(mjmlWithData, {
		validationLevel: 'soft'
	});

	if (errors && errors.length > 0) {
		console.error('MJML compilation errors:', errors);
	}

	return html;
}

/**
 * Send email and create email log
 */
export async function sendEmail({
	to,
	subject,
	html,
	waitlistId,
	template
}: {
	to: string;
	subject: string;
	html: string;
	waitlistId?: string;
	template?: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
	try {
		console.log(`📤 Attempting to send email to ${to}...`);

		// Create timeout promise
		const timeoutPromise = new Promise<never>((_, reject) => {
			setTimeout(() => reject(new Error('Email send timeout (20s)')), 20000);
		});

		// Send email with race against timeout
		const info = await Promise.race([
			transporter.sendMail({
				from: `${EMAIL_NAME} <${EMAIL_FROM}>`,
				to,
				subject,
				html
			}),
			timeoutPromise
		]);

		console.log(`✅ Email sent successfully to ${to}`);

		// Create email log
		await prisma.emailLog.create({
			data: {
				waitlistId,
				to,
				from: EMAIL_FROM,
				subject,
				template,
				status: 'SENT',
				messageId: info.messageId,
				sentAt: new Date()
			}
		});

		return { success: true, messageId: info.messageId };
	} catch (error) {
		console.error(`❌ Failed to send email to ${to}:`, error instanceof Error ? error.message : error);

		// Log failed email
		try {
			await prisma.emailLog.create({
				data: {
					waitlistId,
					to,
					from: EMAIL_FROM,
					subject,
					template,
					status: 'FAILED',
					error: error instanceof Error ? error.message : 'Failed to send email'
				}
			});
		} catch (logError) {
			console.error('Error creating email log:', logError);
		}

		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to send email'
		};
	}
}

/**
 * Send email with notification
 */
export async function sendEmailWithNotification({
	to,
	subject,
	html,
	waitlistId,
	notificationType,
	notificationTitle,
	notificationMessage,
	notificationLink,
	notificationMetadata,
	template
}: {
	to: string;
	subject: string;
	html: string;
	waitlistId: string;
	notificationType: NotificationType;
	notificationTitle: string;
	notificationMessage: string;
	notificationLink?: string;
	notificationMetadata?: Record<string, any>;
	template?: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
	try {
		// Send email
		const emailResult = await sendEmail({ to, subject, html, waitlistId, template });

		// Create notification
		await prisma.notification.create({
			data: {
				waitlistId,
				type: notificationType,
				title: notificationTitle,
				message: notificationMessage,
				link: notificationLink,
				metadata: notificationMetadata,
				emailSent: emailResult.success,
				emailSentAt: emailResult.success ? new Date() : null
			}
		});

		return emailResult;
	} catch (error) {
		console.error('Error sending email with notification:', error);
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to send email'
		};
	}
}

/**
 * Create notification without sending email
 */
export async function createNotification({
	waitlistId,
	type,
	title,
	message,
	link,
	metadata
}: {
	waitlistId: string;
	type: NotificationType;
	title: string;
	message: string;
	link?: string;
	metadata?: Record<string, any>;
}): Promise<void> {
	await prisma.notification.create({
		data: {
			waitlistId,
			type,
			title,
			message,
			link,
			metadata,
			emailSent: false
		}
	});
}

/**
 * Get base URL for email links
 */
export function getBaseUrl(): string {
	return PUBLIC_BASE_URL || 'http://localhost:5173';
}

/**
 * Get current year for email footer
 */
export function getCurrentYear(): number {
	return new Date().getFullYear();
}
