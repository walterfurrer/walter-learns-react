import React, { useState, useEffect } from "react";

// 1. Define the shape of a pull request using a TypeScript interface.
//    This ensures you only use fields that actually exist on the GitHub API response.
interface PullRequest {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: "open" | "closed";
  user: {
    login: string;
  };
  created_at: string;
  body: string | null;
}

interface PullRequestsListpullRequestops {
  owner: string;
  repo: string;
}

const PullRequestsList: React.FC<PullRequestsListpullRequestops> = ({ owner, repo }) => {
  // 3. Use explicit types for state variables.
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPullRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=10`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data: PullRequest[] = await response.json();
        setPullRequests(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchPullRequests();
  }, [owner, repo]);

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading pull requests...</div>;
  }
  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">
        Pull Requests for{" "}
        <a href={`https://github.com/${owner}/${repo}`} className="text-green-400">
          {owner}/{repo}
        </a>
      </h2>
      <ul className="space-y-4">
        {pullRequests.length === 0 ? (
          <li className="text-foreground-muted">No pull requests found.</li>
        ) : (
          pullRequests.map((pullRequest) => (
            <li
              key={pullRequest.id}
              className="bg-foreground rounded-lg shadow p-4 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <a
                href={pullRequest.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-700 hover:underline"
              >
                #{pullRequest.number}: {pullRequest.title}
              </a>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-2">
                <span className={`font-bold ${pullRequest.state === "open" ? "text-green-600" : "text-red-600"}`}>
                  {pullRequest.state.toUpperCase()}
                </span>
                <span>by {pullRequest.user.login}</span>
                <span>Created: {new Date(pullRequest.created_at).toLocaleDateString()}</span>
              </div>
              {pullRequest.body && (
                <p className="mt-2 text-gray-700 line-clamp-3">
                  {pullRequest.body.slice(0, 200)}
                  {pullRequest.body.length > 200 ? "..." : ""}
                </p>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PullRequestsList;
