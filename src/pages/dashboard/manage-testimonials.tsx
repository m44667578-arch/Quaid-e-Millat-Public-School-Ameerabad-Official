'use client';

import AuthGuard from '../../components/AuthGuard';
import GitHubResourceManager from '../../components/GitHubResourceManager';

export default function ManageTestimonials() {
  return (
    <AuthGuard allowedRoles={['principal', 'teacher', 'staff']}>
      <GitHubResourceManager
        title="Manage Testimonials"
        description="Add or update testimonials directly in GitHub JSON."
        filePath="public/data/testimonials.json"
        fields={[
          { name: 'name', label: 'Name' },
          { name: 'message', label: 'Message' },
        ]}
        primaryKey="id"
        itemLabel="Testimonial"
      />
    </AuthGuard>
  );
}
