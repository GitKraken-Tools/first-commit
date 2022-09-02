import { error, json, type RequestEvent } from "@sveltejs/kit";
import { fetchNumCommits, parsePathParams } from "../../../../lib/api";

export const GET = async (event: RequestEvent) => {
    const { user, repo } = parsePathParams(event.url.pathname);
    const numCommits = await fetchNumCommits(user, repo);
    if (numCommits) return json(numCommits);
    throw error(400, 'The repository you requested could not be found.');
}