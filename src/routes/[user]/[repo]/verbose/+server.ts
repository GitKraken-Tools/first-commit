import { json, type RequestEvent } from "@sveltejs/kit";
import { fetchCommit, fetchNumCommits, parsePathParams } from "../../../../lib/api";

export const GET = async (event: RequestEvent) => {
    const { user, repo } = parsePathParams(event.url.pathname);
    const numCommits = await fetchNumCommits(user, repo);
    const commit = await fetchCommit(user, repo, numCommits);
    return json(commit)
}