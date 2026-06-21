'use client';

import AuthGuard from '../../components/AuthGuard';
import GitHubResourceManager from '../../components/GitHubResourceManager';

export default function ManageNotices() {
  return (
    <AuthGuard allowedRoles={['principal', 'teacher', 'staff']}>
      <GitHubResourceManager
        title="Manage Notices"
        description="Add or update notice items directly in GitHub JSON."
        filePath="public/data/notices.json"
        fields={[
          { name: 'title', label: 'Title' },
          { name: 'description', label: 'Description' },
          { name: 'date', label: 'Date', type: 'date' },
        ]}
        primaryKey="id"
        itemLabel="Notice"
      />
    </AuthGuard>
  );
}
