# Taar — Setup Guide

## 1. Supabase Setup

1. Create a new Supabase project at supabase.com
2. Run the SQL in `supabase/schema.sql` in the SQL editor
3. Create a Storage bucket named `products` (set to private)
4. Copy your project URL and anon key to `.env.local`

## 2. Razorpay Setup

1. Create a Razorpay account at razorpay.com
2. Create a Subscription Plan:
   - Name: Taar Pro
   - Amount: ₹399/month
   - Copy the Plan ID → set as `RAZORPAY_PLAN_ID`
3. Get your Key ID and Key Secret from Settings → API Keys
4. Set up a webhook in Settings → Webhooks:
   - URL: `https://yourdomain.com/api/razorpay/webhook`
   - Events: `subscription.activated`, `subscription.charged`, `subscription.cancelled`, `subscription.expired`
   - Copy webhook secret → `RAZORPAY_WEBHOOK_SECRET`

## 3. Resend Setup

1. Create an account at resend.com
2. Add and verify your domain (taar.bio)
3. Create an API key → `RESEND_API_KEY`

## 4. Deploy to Vercel

```bash
npx vercel
```

Add all environment variables in Vercel dashboard.

## 5. Custom Domain

Point `taar.bio` and `*.taar.bio` to Vercel.

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://taar.bio
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_WEBHOOK_SECRET=
RAZORPAY_PLAN_ID=
RESEND_API_KEY=
```
