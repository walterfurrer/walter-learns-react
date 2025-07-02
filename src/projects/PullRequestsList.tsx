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

interface PullRequestsListProps {
  owner: string;
  repo: string;
}

const PullRequestsList: React.FC<PullRequestsListProps> = ({ owner, repo }) => {
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
    <div id="pull-request-container" className="flex flex-col gap-12 mx-auto">
      <div>
        <h2 className="text-2xl font-bold">
          Pull Requests for{" "}
          <a
            href={`https://github.com/${owner}/${repo}`}
            className="text-green-400 text-balance text-left hover:underline hover:underline-offset-8 hover:decoration-4"
          >
            {owner}/{repo}
          </a>
        </h2>
      </div>
      <div className="">
        <ul className="flex flex-col gap-8 max-w-md mx-auto lg:grid lg:grid-cols-2 lg:max-w-3xl">
          {pullRequests.length === 0 ? (
            <li> No pull requests found.</li>
          ) : (
            pullRequests.map((pullRequest) => (
              <li
                key={pullRequest.id}
                className="bg-slate-900/25 border border-slate-500 rounded-lg p-4 h-32 flex flex-col justify-between hover:brightness-150"
              >
                <a
                  href={pullRequest.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-foreground text-left text-balance hover:underline hover:underline-offset-5"
                >
                  #{pullRequest.number}: {pullRequest.title}{" "}
                </a>
                <div className="flex flex-row justify-around gap-4 text-sm text-slate-500/75 mt-2">
                  <span className={`font-bold ${pullRequest.state === "open" ? "text-amber-500" : "text-inherit"}`}>
                    {pullRequest.state.toUpperCase()}
                  </span>
                  <span>by {pullRequest.user.login}</span>
                  <span>Created: {new Date(pullRequest.created_at).toLocaleDateString()}</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default PullRequestsList;
