type GitHubFetchParams = {
  owner: string;
  repo: string;
  path: string;
  branch?: string;
};

type GitHubUpdateParams = GitHubFetchParams & {
  data: unknown;
  message: string;
};

type GitHubUploadParams = GitHubFetchParams & {
  contentBase64: string;
  message: string;
};

const apiCall = async (body: Record<string, unknown>) => {
  const response = await fetch('/api/github', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'GitHub API error');
  }

  return response.json();
};

export async function fetchGitHubFile(params: GitHubFetchParams) {
  const response = await apiCall({ action: 'fetch', ...params });
  return response;
}

export async function updateGitHubFile(params: GitHubUpdateParams) {
  const response = await apiCall({ action: 'update', ...params });
  return response;
}

export async function uploadGitHubFile(params: GitHubUploadParams) {
  const response = await apiCall({ action: 'upload', ...params });
  return response;
}
