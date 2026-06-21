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

const API_BASE = 'https://api.github.com';

const base64Encode = (value: string) => {
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    const bytes = new TextEncoder().encode(value);
    let binary = '';
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return window.btoa(binary);
  }

  return Buffer.from(value, 'utf8').toString('base64');
};

const base64Decode = (encoded: string) => {
  if (typeof window !== 'undefined' && typeof window.atob === 'function') {
    const binary = window.atob(encoded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  return Buffer.from(encoded, 'base64').toString('utf8');
};

const getHeaders = (token: string) => ({
  Accept: 'application/vnd.github+json',
  Authorization: `token ${token}`,
});

export async function fetchGitHubFile(owner: string, repo: string, path: string, token: string, branch = 'main') {
  const response = await fetch(`${API_BASE}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`, {
    headers: getHeaders(token),
  });

  if (!response.ok) {
    const error = (await response.json()) as GitHubResponse;
    throw new Error(error.message || 'Unable to fetch GitHub file.');
  }

  const json = (await response.json()) as GitHubFileResponse;
  const content = base64Decode(json.content.replace(/\n/g, ''));
  return {
    sha: json.sha,
    data: JSON.parse(content),
  };
}

export async function updateGitHubFile(
  owner: string,
  repo: string,
  path: string,
  token: string,
  data: unknown,
  message: string,
  branch = 'main'
) {
  const file = await fetchGitHubFile(owner, repo, path, token, branch);
  const encoded = base64Encode(JSON.stringify(data, null, 2));

  const response = await fetch(`${API_BASE}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`, {
    method: 'PUT',
    headers: {
      ...getHeaders(token),
      'Content-Type': 'application/json',
    },
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

  const result = (await response.json()) as GitHubResponse;
  return result;
}

export async function uploadGitHubFile(
  owner: string,
  repo: string,
  path: string,
  token: string,
  content: string,
  message: string,
  branch = 'main'
) {
  const encoded = base64Encode(content);
  const response = await fetch(`${API_BASE}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`, {
    method: 'PUT',
    headers: {
      ...getHeaders(token),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: encoded,
      branch,
    }),
  });

  if (!response.ok) {
    const error = (await response.json()) as GitHubResponse;
    throw new Error(error.message || 'Unable to upload file to GitHub.');
  }

  return (await response.json()) as GitHubResponse;
}
