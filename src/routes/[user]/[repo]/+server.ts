import { json, type RequestEvent } from "@sveltejs/kit";

export const GET = async (event: RequestEvent) => {
    return json({hello: "world"})
}