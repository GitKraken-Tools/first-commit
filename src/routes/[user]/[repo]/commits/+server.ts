import { json, type RequestEvent } from "@sveltejs/kit";
import { fetchNumCommits, parsePathParams } from "../../../../lib/api";

export const GET = async (event: RequestEvent) => {
    const { user, repo } = parsePathParams(event.url.pathname);
    return json(await fetchNumCommits(user, repo));
}