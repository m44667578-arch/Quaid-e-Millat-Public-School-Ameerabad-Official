'use client';

import { useEffect, useState } from 'react';
import { fetchGitHubFile, updateGitHubFile } from '../lib/githubClient';

type Field = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
};

type Props = {
  title: string;
  description: string;
  filePath: string;
  fields: Field[];
  primaryKey?: string;
  itemLabel?: string;
};

export default function GitHubResourceManager({
  title,
  description,
  filePath,
  fields,
  primaryKey = 'id',
  itemLabel = 'Item',
}: Props) {
  const [owner, setOwner] = useState('m44667578-arch');
  const [repo, setRepo] = useState('Quaid-e-Millat-Public-School-Ameerabad-Official');
  const [branch, setBranch] = useState('main');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  useEffect(() => {
    setStatus('');
    setError('');
  }, [owner, repo, branch]);

  const handleLoad = async () => {
    setLoading(true);
    setError('');
    setStatus('Fetching file from GitHub...');

    try {
      const result = await fetchGitHubFile({ owner, repo, path: filePath, branch });
      setItems(Array.isArray(result.data) ? result.data : []);
      setStatus('File loaded successfully.');
    } catch (err) {
      setError((err as Error).message);
      setItems([]);
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setNewItem(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
  };

  const getKey = (item: any) => String(item[primaryKey] ?? '');

  const handleDelete = async (itemId: string) => {
    if (!confirm(`Delete this ${itemLabel}?`)) {
      return;
    }

    setLoading(true);
    setStatus('Deleting item from GitHub...');
    setError('');

    try {
      const updatedItems = items.filter((item) => getKey(item) !== itemId);
      await updateGitHubFile({
        owner,
        repo,
        path: filePath,
        branch,
        data: updatedItems,
        message: `Delete ${itemLabel}`,
      });
      setItems(updatedItems);
      setStatus(`${itemLabel} deleted successfully.`);
      if (editingId === itemId) {
        resetForm();
      }
    } catch (err) {
      setError((err as Error).message);
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item: any) => {
    setEditingId(getKey(item));
    setNewItem(fields.reduce((acc, field) => ({ ...acc, [field.name]: String(item[field.name] ?? '') }), {}));
  };

  const handleSave = async () => {
    const hasPrimaryKey = Boolean(newItem[primaryKey]);
    const idValue = hasPrimaryKey ? String(newItem[primaryKey]) : `${itemLabel.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    const entry = {
      ...newItem,
      [primaryKey]: idValue,
    };

    setLoading(true);
    setStatus(editingId ? 'Updating GitHub file...' : 'Adding item to GitHub...');
    setError('');

    try {
      const updatedItems = editingId
        ? items.map((item) => (getKey(item) === editingId ? entry : item))
        : [...items, entry];

      await updateGitHubFile({
        owner,
        repo,
        path: filePath,
        branch,
        data: updatedItems,
        message: editingId ? `Update ${itemLabel}` : `Add ${itemLabel}`,
      });
      setItems(updatedItems);
      setStatus(editingId ? `${itemLabel} updated successfully.` : `${itemLabel} added successfully.`);
      resetForm();
    } catch (err) {
      setError((err as Error).message);
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>{title}</h1>
      <p>{description}</p>

      <section className="card">
        <h2>GitHub Connection</h2>
        <div className="grid">
          <label>
            Owner
            <input value={owner} onChange={(e) => setOwner(e.target.value)} />
          </label>
          <label>
            Repository
            <input value={repo} onChange={(e) => setRepo(e.target.value)} />
          </label>
          <label>
            Branch
            <input value={branch} onChange={(e) => setBranch(e.target.value)} />
          </label>
        </div>
        <p className="hint">Uses the server-side GitHub token configured via environment variables.</p>
        <button disabled={loading} onClick={handleLoad}>Load current data</button>
      </section>

      <section className="card">
        <h2>{editingId ? `Edit ${itemLabel}` : `Add ${itemLabel}`}</h2>
        <div className="grid">
          {fields.map((field) => (
            <label key={field.name}>
              {field.label}
              <input
                type={field.type || 'text'}
                placeholder={field.placeholder || ''}
                value={newItem[field.name] ?? ''}
                onChange={(e) => setNewItem({ ...newItem, [field.name]: e.target.value })}
              />
            </label>
          ))}
        </div>
        <div className="action-bar">
          <button disabled={loading} onClick={handleSave}>{editingId ? `Update ${itemLabel}` : `Save ${itemLabel}`}</button>
          {editingId && (
            <button type="button" className="button secondary" disabled={loading} onClick={resetForm}>Cancel</button>
          )}
        </div>
      </section>

      {status && <p className="status">{status}</p>}
      {error && <p className="error">{error}</p>}

      <section className="card">
        <h2>Existing {itemLabel}s</h2>
        {items.length === 0 ? (
          <p>No items loaded yet. Click Load current data.</p>
        ) : (
          <ul className="list">
            {items.map((item) => (
              <li key={getKey(item)} className="card">
                <div className="item-header">
                  <strong>{item[fields[0].name] || item[primaryKey]}</strong>
                  <div className="item-actions">
                    <button type="button" className="button secondary" onClick={() => handleSelect(item)}>Edit</button>
                    <button type="button" className="button danger" onClick={() => handleDelete(getKey(item))}>Delete</button>
                  </div>
                </div>
                <pre>{JSON.stringify(item, null, 2)}</pre>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
