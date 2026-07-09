# Meenakshi Singh — Portfolio Website

A full-stack personal portfolio built with **Next.js**, **Supabase**, and **Google OAuth**, showcasing my projects, skills, and experience as an aspiring Machine Learning Engineer and Data Scientist.

🔗 **Live site:** [meenakshisingh.netlify.app](https://agent-6a4f2b257d4518f39d3cdbc5--meenakshisingh.netlify.app/)

---

## ✨ Features

- **Responsive, animated UI** built with Next.js App Router, Tailwind CSS, and Framer Motion
- **Dark/light theme** toggle
- **Projects showcase** with tech tags and GitHub links
- **Skills, education, and leadership experience** sections
- **Contact form** — messages are saved to a Supabase database and (optionally) emailed via Resend
- **Admin dashboard** (`/admin`) protected by **Google Sign-In** — only the site owner can view contact form submissions
- **Row Level Security (RLS)** on the database so only the owner's authenticated account can read/update messages

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 13 (App Router), TypeScript, Tailwind CSS, Framer Motion |
| UI Components | shadcn/ui, Radix UI, Lucide icons |
| Backend | Next.js API routes |
| Database & Auth | Supabase (PostgreSQL + Google OAuth) |
| Email notifications | Resend |
| Hosting | Netlify |

---

## 📁 Project Structure

```
├── app/
│   ├── admin/            # Protected admin dashboard + Google OAuth callback
│   ├── api/contact/      # API route for contact form email notifications
│   ├── layout.tsx
│   └── page.tsx
├── components/           # Hero, About, Skills, Projects, Contact, Footer, etc.
├── lib/                  # Supabase client + utility functions
├── hooks/                # Custom React hooks
├── public/               # Resume PDF, profile photo, robots.txt, sitemap.xml
├── supabase/migrations/  # Versioned database schema (SQL)
└── netlify.toml          # Netlify build configuration
```

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/MeenakshiSingh0722/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key   # optional — for email notifications
```

### 4. Set up the database
In your Supabase project's **SQL Editor**, run the migrations found in `supabase/migrations/` in order — this creates the `contact_submissions` table with the correct security policies.

### 5. Enable Google Sign-In
1. Create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com/).
2. Add the redirect URI: `https://<your-supabase-project-ref>.supabase.co/auth/v1/callback`
3. In Supabase Dashboard → **Authentication → Providers → Google**, paste your Client ID and Secret.
4. Add `http://localhost:3000/admin/callback` (and your production URL) under **Authentication → URL Configuration → Redirect URLs**.

### 6. Run the dev server
```bash
npm run dev
```
Visit `http://localhost:3000`.

---

## 🌐 Deployment

This project is configured for **Netlify**:
1. Push the repo to GitHub.
2. Import it in Netlify — build settings are auto-detected from `netlify.toml`.
3. Add the environment variables above under **Site settings → Environment variables**.
4. Deploy.
5. Add your live domain's `/admin/callback` URL to Supabase's redirect URL allow-list.

---

## 📄 License

This project is personal portfolio code. Feel free to reference the structure, but please don't copy the content directly.

---

## 📬 Contact

- **Email:** meenakshisingh0722@gmail.com
- **LinkedIn:** [linkedin.com/in/meenakshi-singh12](https://linkedin.com/in/meenakshi-singh12)
- **GitHub:** [github.com/MeenakshiSingh0722](https://github.com/MeenakshiSingh0722)
