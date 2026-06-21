import type { NextApiRequest, NextApiResponse } from 'next';

const API_BASE = 'https://api.github.com';

type GitHubFileResponse = {
  content: string;
  sha: string;
};

type GitHubResponse = {
  content?: string;
  sha?: string;
  message?: string;
  documentation_url?: string;
};

const getHeaders = (token: string) => ({
  Accept: 'application/vnd.github+json',
  Authorization: `token ${token}`,
});

const base64Encode = (value: string) => Buffer.from(value, 'utf8').toString('base64');

async function fetchGitHubFile(owner: string, repo: string, path: string, branch = 'main', token: string) {
  const response = await fetch(`${API_BASE}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`, {
    headers: getHeaders(token),
  });

  if (!response.ok) {
    const error = (await response.json()) as GitHubResponse;
    throw new Error(error.message || 'Unable to fetch GitHub file.');
  }

  const json = (await response.json()) as GitHubFileResponse;
  const content = Buffer.from(json.content, 'base64').toString('utf8');
  return {
    sha: json.sha,
    data: JSON.parse(content),
  };
}

async function updateGitHubFile(owner: string, repo: string, path: string, branch: string, token: string, data: unknown, message: string) {
  const file = await fetchGitHubFile(owner, repo, path, branch, token);
  const encoded = base64Encode(JSON.stringify(data, null, 2));
  const response = await fetch(`${API_BASE}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify({
      message,
      content: encoded,
      sha: file.sha,
      branch,
    }),
  });

  if (!response.ok) {
    const error = (await response.json()) as GitHubResponse;
    throw new Error(error.message || 'Unable to update GitHub file.');
  }

  return response.json();
}

async function uploadGitHubFile(owner: string, repo: string, path: string, branch: string, token: string, contentBase64: string, message: string) {
  const response = await fetch(`${API_BASE}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify({
      message,
      content: contentBase64,
      branch,
    }),
  });

  if (!response.ok) {
    const error = (await response.json()) as GitHubResponse;
    throw new Error(error.message || 'Unable to upload GitHub file.');
  }

  return response.json();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    res.status(500).json({ message: 'GitHub token is not configured.' });
    return;
  }

  const { action, owner, repo, path, branch = 'main', data, message, contentBase64 } = req.body;

  try {
    if (action === 'fetch') {
      const result = await fetchGitHubFile(owner, repo, path, branch, token);
      res.status(200).json(result);
      return;
    }

    if (action === 'update') {
      const result = await updateGitHubFile(owner, repo, path, branch, token, data, message);
      res.status(200).json(result);
      return;
    }

    if (action === 'upload') {
      const result = await uploadGitHubFile(owner, repo, path, branch, token, contentBase64, message);
      res.status(200).json(result);
      return;
    }

    res.status(400).json({ message: 'Invalid action.' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
