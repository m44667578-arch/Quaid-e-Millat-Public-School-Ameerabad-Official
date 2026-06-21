# 🏫 Quaid-e-Millat Public School Ameerabad

**Official School Website**

A modern, dynamic, and fully responsive school website designed to serve as the digital front door for Quaid-e-Millat Public School Ameerabad.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Student Result Search** | Students can look up their academic results by name, roll number, or class. |
| **Notice Board** | Real-time announcements displayed on the homepage. |
| **Event Calendar** | Upcoming school events, holidays, and activities. |
| **Photo Gallery** | Showcase school life, events, and achievements. |
| **Staff Profiles** | Teacher and administrative staff information. |
| **Contact & Inquiry** | Direct communication with the school through a contact form. |
| **Admin Dashboard** | Principal or designated staff can manage content without touching code. |

---

## 🚀 Technology Stack

| Technology | Purpose |
|------------|---------|
| **Next.js (Pages Router)** | React framework for server-side rendering and static generation |
| **JavaScript / React** | Core frontend language |
| **CSS Modules** | Component-scoped styling |
| **JSON Files** | Content storage (managed via admin dashboard) |
| **Vercel / Netlify** | Deployment platform |
| **GitHub API** | Content updates via admin dashboard |

---

## 📁 Project Structure

## 🔐 GitHub Token Setup

This project uses a server-side GitHub token to update JSON content and upload files via `/api/github`. Do not commit your token to the repository.

1. Create a file at the project root named `.env.local`.
2. Add this line to it:

   ```env
   GITHUB_TOKEN=your_personal_access_token_here
   ```

3. Restart the development server.

The `.gitignore` file should also include `.env.local` so the token is not committed.
