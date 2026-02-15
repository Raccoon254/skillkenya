import { readFileSync } from 'fs';
import { join } from 'path';
import { compileMJMLTemplate, sendEmail, sendEmailWithNotification, getBaseUrl, getCurrentYear } from './index';

// Read MJML templates
const TEMPLATES_DIR = join(process.cwd(), 'src/lib/server/email/templates');

function getTemplate(name: string): string {
	return readFileSync(join(TEMPLATES_DIR, `${name}.mjml`), 'utf-8');
}

/**
 * Generate a random 6-digit verification code
 */
export function generateVerificationCode(): string {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send verification code email
 */
export async function sendVerificationCodeEmail(
	email: string,
	verificationCode: string
): Promise<{ success: boolean; error?: string }> {
	const template = getTemplate('verify-code');
	const html = compileMJMLTemplate(template, {
		verificationCode,
		baseUrl: getBaseUrl(),
		year: getCurrentYear()
	});

	console.log(`📧 Sending verification code to ${email}...`);

	return sendEmail({
		to: email,
		subject: 'Verify Your Email - SkillKenya Waitlist',
		html,
		template: 'verify-code'
	});
}

/**
 * Send welcome email after successful waitlist registration
 */
export async function sendWelcomeEmail(
	waitlistId: string,
	email: string,
	userName: string
): Promise<{ success: boolean; error?: string }> {
	const template = getTemplate('welcome');
	const html = compileMJMLTemplate(template, {
		userName,
		baseUrl: getBaseUrl(),
		year: getCurrentYear()
	});

	return sendEmailWithNotification({
		to: email,
		subject: 'Welcome to SkillKenya Waitlist! 🎓',
		html,
		waitlistId,
		notificationType: 'WAITLIST_JOINED',
		notificationTitle: 'Welcome to SkillKenya!',
		notificationMessage: `Welcome ${userName}! You're now on the waitlist and will be notified when we launch.`,
		template: 'welcome'
	});
}
