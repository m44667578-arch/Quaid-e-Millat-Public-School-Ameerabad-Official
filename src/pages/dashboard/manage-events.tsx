'use client';

import AuthGuard from '../../components/AuthGuard';
import GitHubResourceManager from '../../components/GitHubResourceManager';

export default function ManageEvents() {
  return (
    <AuthGuard allowedRoles={['principal', 'teacher', 'staff']}>
      <GitHubResourceManager
        title="Manage Events"
        description="Add or update events directly in GitHub JSON."
        filePath="public/data/events.json"
        fields={[
          { name: 'name', label: 'Event Name' },
          { name: 'date', label: 'Date', type: 'date' },
          { name: 'description', label: 'Description' },
        ]}
        primaryKey="id"
        itemLabel="Event"
      />
    </AuthGuard>
  );
}
