'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { uploadGitHubFile, fetchGitHubFile, updateGitHubFile } from '../../lib/githubClient';

export default function UploadGallery() {
  const [owner] = useState('m44667578-arch');
  const [repo] = useState('Quaid-e-Millat-Public-School-Ameerabad-Official');
  const [branch] = useState('main');
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);
  };

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!imageFile) {
      setError('Please select an image file to upload.');
      return;
    }

    const filePath = `public/uploads/${Date.now()}-${imageFile.name}`;
    const reader = new FileReader();

    reader.onloadend = async () => {
      const content = reader.result;
      if (typeof content !== 'string') {
        setError('Unable to read file content.');
        return;
      }

      setLoading(true);
      setError('');
      setStatus('Uploading image to GitHub...');

      try {
        await uploadGitHubFile({
          owner,
          repo,
          path: filePath,
          branch,
          contentBase64: content.split(',')[1],
          message: `Upload gallery image ${imageFile.name}`,
        });

        const result = await fetchGitHubFile({
          owner,
          repo,
          path: 'public/data/gallery.json',
          branch,
        });

        const existing = Array.isArray(result.data) ? result.data : [];
        const newItem = {
          id: `gallery-${Date.now()}`,
          title,
          image: `/${filePath}`,
        };
        const updated = [...existing, newItem];

        await updateGitHubFile({
          owner,
          repo,
          path: 'public/data/gallery.json',
          branch,
          data: updated,
          message: `Add gallery entry ${title}`,
        });

        setStatus('Gallery image uploaded and added successfully.');
        setTitle('');
        setImageFile(null);
      } catch (err) {
        setError((err as Error).message);
        setStatus('');
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(imageFile);
  };

  return (
    <div className="page">
      <h1>Upload Gallery Image</h1>
      <form onSubmit={handleUpload} className="search-form">
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Image File
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </label>
        <button type="submit" disabled={loading}>Upload Image</button>
      </form>

      {status && <p className="status">{status}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
