'use client';

import Link from 'next/link';
import AuthGuard from '../../components/AuthGuard';
import { logoutUser, getCurrentUser } from '../../lib/auth';

export default function PrincipalDashboard() {
  const user = getCurrentUser();

  return (
    <AuthGuard allowedRoles={['principal']}>
      <div className="page">
        <h1>Principal Dashboard</h1>
        <p>Welcome {user?.name || 'Principal'}. Use the tools below to manage accounts and GitHub-backed school data.</p>
        <div className="dashboard-nav">
          <Link href="/dashboard/manage-notices" className="button primary">Manage Notices</Link>
          <Link href="/dashboard/manage-events" className="button primary">Manage Events</Link>
          <Link href="/dashboard/manage-gallery" className="button primary">Manage Gallery</Link>
          <Link href="/dashboard/upload-gallery" className="button primary">Upload Gallery Image</Link>
          <Link href="/dashboard/manage-testimonials" className="button primary">Manage Testimonials</Link>
          <Link href="/dashboard/manage-pending-testimonials" className="button primary">Approve Testimonials</Link>
          <Link href="/dashboard/manage-results" className="button primary">Upload Results</Link>
          <Link href="/dashboard/manage-accounts" className="button secondary">Manage Accounts</Link>
        </div>
        <button type="button" className="button danger" onClick={() => { logoutUser(); window.location.href = '/login'; }}>
          Logout
        </button>
      </div>
    </AuthGuard>
  );
}
