import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <header className="site-header">
        <div className="container header-inner">
          <div>
            <Link href="/" className="brand">
              Quaid-e-Millat Public School
            </Link>
          </div>
          <nav className="main-nav">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/principal-message">Principal</Link>
            <Link href="/staff">Staff</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/events">Events</Link>
            <Link href="/notices">Notices</Link>
            <Link href="/testimonials">Testimonials</Link>
            <Link href="/results">Results</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/dashboard/principal">Admin</Link>
            <Link href="/dashboard/student">Student</Link>
            <Link href="/dashboard/parent">Parent</Link>
            <Link href="/dashboard/teacher">Teacher</Link>
            <Link href="/login">Login</Link>
            <Link href="/submit-testimonial">Submit</Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container">
          <p>© 2026 Quaid-e-Millat Public School Ameerabad. Built with free GitHub-backed CMS.</p>
        </div>
      </footer>
    </div>
  );
}
