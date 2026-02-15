# SkillKenya Waitlist System - Complete Setup Guide

## Overview

This is a complete waitlist management system with email verification, database persistence, and admin dashboard. Built with SvelteKit, Prisma, MJML, and Nodemailer.

## Features

✅ Email verification with 6-digit codes (10-minute expiry)
✅ Prisma database with PostgreSQL (Neon)
✅ Beautiful MJML email templates
✅ Admin dashboard to manage waitlist entries
✅ OG user tracking (imported from Excel)
✅ Email notification logging
✅ Real-time validation
✅ Responsive UI

## Setup Instructions

### 1. Database Setup

Your database is already configured in `.env` with Neon PostgreSQL. To push the schema to your database:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Alternative: Create a migration
npm run db:migrate
```

### 2. Environment Variables

All required environment variables are already set in your `.env` file:

- ✅ `DATABASE_URL` - PostgreSQL connection string
- ✅ `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - Gmail SMTP
- ✅ `EMAIL_FROM` - Sender email address

For production, make sure to set `PUBLIC_BASE_URL` to your domain:

```bash
PUBLIC_BASE_URL=https://www.skillkenya.com
```

### 3. Import Existing Waitlist Data

Your existing waitlist data from `src/data/skillkenya_waitlist.xlsx` can be imported:

```bash
npm run import:waitlist
```

This will:
- Import all emails from the Excel file
- Mark them as "OG" users (isOG = true)
- Set them as verified
- Preserve existing data if emails already exist

**Expected Excel columns:**
- `Email` or `email` or `EMAIL` (required)
- `Name` or `name` or `NAME` (optional)
- `Phone` or `phone` or `PHONE` (optional)

### 4. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## Usage

### Frontend - Waitlist Signup

Replace your existing `EmailForm` component with the new `WaitlistForm`:

```svelte
<script>
  import WaitlistForm from "$components/WaitlistForm.svelte";
</script>

<WaitlistForm />
```

**User Flow:**
1. User enters email
2. System sends 6-digit verification code via email
3. User enters code + optional name/phone
4. System verifies code and adds to waitlist
5. Welcome email sent automatically

### Admin Dashboard

Access the admin dashboard at `/admin/waitlist`:

**Features:**
- View all waitlist entries with pagination
- Filter by: All, Verified, Pending, OG Users
- Real-time statistics (total, verified, OG count, last 7 days)
- Mark/unmark users as OG
- Delete entries
- See join dates and sources

### API Endpoints

#### POST `/api/waitlist/request-code`
Request a verification code

```json
{
  "email": "user@example.com"
}
```

#### POST `/api/waitlist/verify`
Verify code and join waitlist

```json
{
  "email": "user@example.com",
  "code": "123456",
  "name": "John Doe",  // optional
  "phone": "+254700000000"  // optional
}
```

#### GET `/api/waitlist`
Get all waitlist entries (admin)

Query params:
- `page` (default: 1)
- `limit` (default: 50)
- `verified` (true/false)
- `isOG` (true/false)

#### GET `/api/waitlist/stats`
Get waitlist statistics

#### PATCH `/api/waitlist/[id]`
Update waitlist entry

```json
{
  "name": "New Name",
  "isOG": true,
  "verified": true
}
```

#### DELETE `/api/waitlist/[id]`
Delete waitlist entry

## Database Schema

### WaitlistEntry
- `id` (String, CUID)
- `email` (String, unique, indexed)
- `name` (String, optional)
- `phone` (String, optional)
- `isOG` (Boolean) - Marks original users from Excel import
- `verified` (Boolean) - Email verification status
- `verificationCode` (String, nullable) - 6-digit code
- `verificationCodeExpiry` (DateTime, nullable)
- `source` (String) - Where they signed up from
- `metadata` (JSON) - Additional data
- `createdAt`, `updatedAt` (DateTime)

### Notification
- `id`, `waitlistId` (String)
- `type` (NotificationType enum)
- `title`, `message` (String)
- `link` (String, optional)
- `emailSent`, `read` (Boolean)
- `emailSentAt`, `readAt`, `createdAt` (DateTime)

### EmailLog
- `id`, `waitlistId` (String)
- `to`, `from`, `subject` (String)
- `template` (String, optional)
- `status` (EmailStatus enum: PENDING, SENT, FAILED, BOUNCED)
- `messageId`, `error` (String, optional)
- `sentAt`, `createdAt` (DateTime)

## Email Templates

Located in `src/lib/server/email/templates/`:

### verify-code.mjml
Sent when user requests to join waitlist:
- Professional SkillKenya branding
- Large 6-digit verification code
- 10-minute expiry countdown
- Help center link

### welcome.mjml
Sent after successful verification:
- Welcome message
- What's next section
- Link to WhatsApp community
- Launch date information

## Customization

### Email Templates

Edit MJML files in `src/lib/server/email/templates/`:

```mjml
<mj-text>{{variableName}}</mj-text>
```

Available variables (configured in `services.ts`):
- `{{verificationCode}}` - The 6-digit code
- `{{userName}}` - User's name
- `{{baseUrl}}` - Site URL
- `{{year}}` - Current year

### Verification Code Settings

In `src/lib/server/email/services.ts`:

```typescript
// Change code length (default: 6 digits)
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Change expiry time (currently 10 minutes)
const verificationCodeExpiry = new Date(Date.now() + 10 * 60 * 1000);
```

### Styling

The `WaitlistForm` component uses Tailwind CSS. Modify classes directly in:
`src/components/WaitlistForm.svelte`

## Production Checklist

- [ ] Set `PUBLIC_BASE_URL` in production environment
- [ ] Configure SMTP settings for production mail server
- [ ] Run `npm run db:push` on production database
- [ ] Import existing waitlist: `npm run import:waitlist`
- [ ] Secure `/admin/waitlist` route with authentication
- [ ] Set up email delivery monitoring
- [ ] Configure rate limiting for API endpoints
- [ ] Test email delivery across providers (Gmail, Outlook, etc.)

## Troubleshooting

### Emails not sending

1. Check SMTP credentials in `.env`
2. For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833)
3. Check email logs in database:
   ```bash
   npm run db:studio
   # Navigate to EmailLog table
   ```

### Database connection errors

1. Verify `DATABASE_URL` in `.env`
2. Check if database is accessible
3. Run `npx prisma db push` to sync schema

### Import script fails

1. Check Excel file path: `src/data/skillkenya_waitlist.xlsx`
2. Verify column names match (Email, Name, Phone)
3. Check database connection
4. Review console output for specific errors

## Scripts Reference

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Create migration
npm run db:studio        # Open Prisma Studio (database GUI)

npm run import:waitlist  # Import Excel data as OG users
```

## Support

For issues or questions:
1. Check this documentation
2. Review console logs
3. Check Prisma Studio for database state
4. Review email logs in database

---

**Built with:** SvelteKit, Prisma, PostgreSQL, MJML, Nodemailer, TailwindCSS
