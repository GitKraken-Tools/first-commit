import { error, json, type RequestEvent } from "@sveltejs/kit";
import { fetchCommit, fetchNumCommits, parsePathParams } from "../../../../lib/api";

export const GET = async (event: RequestEvent) => {
    const { user, repo } = parsePathParams(event.url.pathname);
    const numCommits = await fetchNumCommits(user, repo);
    const commit = await fetchCommit(user, repo, numCommits);
    if (commit.sha) return new Response(String(commit.sha));
    throw error(400, 'The repository you requested could not be found.');
}