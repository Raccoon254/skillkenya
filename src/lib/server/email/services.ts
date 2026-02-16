import { compileMJMLTemplate, sendEmail, sendEmailWithNotification, getBaseUrl, getCurrentYear } from './index';

// Import MJML templates as strings at build time (Vite raw imports)
import verifyCodeTemplate from './templates/verify-code.mjml?raw';
import welcomeTemplate from './templates/welcome.mjml?raw';

// Template registry
const TEMPLATES: Record<string, string> = {
	'verify-code': verifyCodeTemplate,
	'welcome': welcomeTemplate
};

function getTemplate(name: string): string {
	const template = TEMPLATES[name];
	if (!template) {
		throw new Error(`Template "${name}" not found`);
	}
	return template;
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
