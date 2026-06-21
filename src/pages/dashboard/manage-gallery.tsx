'use client';

import AuthGuard from '../../components/AuthGuard';
import GitHubResourceManager from '../../components/GitHubResourceManager';

export default function ManageGallery() {
  return (
    <AuthGuard allowedRoles={['principal', 'teacher', 'staff']}>
      <GitHubResourceManager
        title="Manage Gallery"
        description="Add gallery entries directly in GitHub JSON. Use image URLs or paths for gallery items."
        filePath="public/data/gallery.json"
        fields={[
          { name: 'title', label: 'Image Title' },
          { name: 'image', label: 'Image URL or path' },
        ]}
        primaryKey="id"
        itemLabel="Gallery Item"
      />
    </AuthGuard>
  );
}
