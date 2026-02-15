# Quick Start Guide - SkillKenya Waitlist

## 🚀 Get Started in 3 Steps

### Step 1: Push Database Schema

```bash
npm run db:push
```

This creates all the necessary tables in your Neon database.

### Step 2: Import Existing Waitlist (Optional)

If you have existing users in `src/data/skillkenya_waitlist.xlsx`:

```bash
npm run import:waitlist
```

This will mark them as "OG" users.

### Step 3: Run the Dev Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## 📧 Using the Waitlist Form

### Option 1: Replace Existing Email Form

In `src/routes/+page.svelte`, replace:

```svelte
<EmailForm />
```

with:

```svelte
<WaitlistForm />
```

### Option 2: Use Alongside Existing Form

Add it in a new section:

```svelte
<script>
  import WaitlistForm from "$components/WaitlistForm.svelte";
</script>

<!-- Your existing content -->

<!-- New waitlist section -->
<div class="container mx-auto px-4 my-16">
  <div class="max-w-xl mx-auto text-center">
    <h2 class="text-3xl font-bold mb-6">Join the Waitlist</h2>
    <p class="text-gray-400 mb-8">
      Get early access and exclusive beta tester benefits
    </p>
    <WaitlistForm />
  </div>
</div>
```

## 🎨 Admin Dashboard

Access at: `http://localhost:5173/admin/waitlist`

**Features:**
- View all waitlist entries
- Filter by verified/pending/OG status
- Real-time statistics
- Edit and delete entries

⚠️ **TODO:** Add authentication to secure this route in production!

## 📋 What Was Built

### Database (Prisma + PostgreSQL)
- ✅ WaitlistEntry model (email, name, phone, verification status, OG flag)
- ✅ Notification model (tracks email notifications)
- ✅ EmailLog model (logs all emails sent)

### Email System (MJML + Nodemailer)
- ✅ Verification code email (6-digit code, 10-min expiry)
- ✅ Welcome email (sent after verification)
- ✅ Email logging to database
- ✅ Professional SkillKenya branding

### API Endpoints
- ✅ `POST /api/waitlist/request-code` - Request verification code
- ✅ `POST /api/waitlist/verify` - Verify code and join waitlist
- ✅ `GET /api/waitlist` - Get all entries (admin)
- ✅ `GET /api/waitlist/stats` - Get statistics
- ✅ `PATCH /api/waitlist/[id]` - Update entry
- ✅ `DELETE /api/waitlist/[id]` - Delete entry

### UI Components
- ✅ WaitlistForm.svelte - Full signup flow with validation
- ✅ Admin dashboard at `/admin/waitlist`

### Scripts
- ✅ Import script for Excel data

## 🔧 Next Steps

1. **Test the waitlist flow:**
   - Go to homepage
   - Enter your email
   - Check your email for the code
   - Complete verification

2. **Check the admin dashboard:**
   - Visit `/admin/waitlist`
   - See your entry
   - Check statistics

3. **Import OG users:**
   ```bash
   npm run import:waitlist
   ```

4. **For Production:**
   - Add authentication to admin routes
   - Set `PUBLIC_BASE_URL` environment variable
   - Configure production SMTP if needed
   - Test email delivery

## 📚 Full Documentation

See `WAITLIST_SETUP.md` for complete documentation including:
- Detailed API reference
- Customization guide
- Email template editing
- Troubleshooting
- Production checklist

## 🆘 Common Issues

**Can't connect to database?**
- Check DATABASE_URL in .env
- Run `npx prisma db push` to ensure schema is synced

**Emails not sending?**
- Verify SMTP credentials in .env
- For Gmail, use an App Password
- Check EmailLog table in Prisma Studio: `npm run db:studio`

**Import script fails?**
- Verify Excel file exists: `src/data/skillkenya_waitlist.xlsx`
- Check column names (Email, Name, Phone)

## 🎉 You're Ready!

Your waitlist system is fully functional with:
- Email verification
- Database persistence
- Admin dashboard
- Email templates
- OG user tracking

Happy coding! 🚀
