# Anshuman Portfolio

Multi-page Next.js portfolio for Anshuman, AI Systems Engineer.

## Pages
- Home
- About
- Services
- Process
- Pricing
- FAQ
- Contact
- Privacy Policy
- Terms & Conditions

## Local preview

Use the normal Next dev server for a fast preview:

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

If you want a Netlify-like local preview, install the Netlify CLI and run:

```bash
npx netlify dev
```

## Netlify deployment

This project is already set up for Netlify with `netlify.toml` and the Next.js plugin.

Deployment steps:

1. Push the project to GitHub.
2. In Netlify, import the GitHub repo.
3. Keep the build command as:

```bash
npm run build
```

4. Keep the publish directory as:

```bash
.next
```

5. Add these environment variables in Netlify if you want email delivery from the contact form:

```bash
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
CONTACT_TO_EMAIL=
MAIL_FROM=
```

## Contact form

The contact form posts to `/api/contact`.

If SMTP variables are missing, the endpoint still accepts submissions but cannot deliver email. Add the environment variables above on Netlify to make the form fully live.

## Notes
- Favicon included at `/public/favicon.svg`
- SEO metadata included for every page
- Responsive layout built for mobile, tablet, and desktop
- No fake testimonials, metrics, reviews, or AI-generated visuals
- No purple gradients or heavy animation
