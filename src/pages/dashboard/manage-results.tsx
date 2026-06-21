'use client';

import AuthGuard from '../../components/AuthGuard';
import GitHubResourceManager from '../../components/GitHubResourceManager';

export default function ManageResults() {
  return (
    <AuthGuard allowedRoles={['principal', 'teacher', 'staff']}>
      <GitHubResourceManager
        title="Manage Results"
        description="Upload or update result records directly in GitHub JSON."
        filePath="public/data/results.json"
        fields={[
          { name: 'rollNo', label: 'Roll Number' },
          { name: 'name', label: 'Student Name' },
          { name: 'class', label: 'Class' },
          { name: 'dob', label: 'Date of Birth', type: 'date' },
          { name: 'physics', label: 'Physics' },
          { name: 'math', label: 'Math' },
          { name: 'english', label: 'English' },
          { name: 'percentage', label: 'Percentage' },
          { name: 'grade', label: 'Grade' },
        ]}
        primaryKey="rollNo"
        itemLabel="Result"
      />
    </AuthGuard>
  );
}
