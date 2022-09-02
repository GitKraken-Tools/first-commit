import { error } from "@sveltejs/kit";

export const parsePathParams = (url: string): {user: string, repo: string} => {
    const split = url.split('/');
    return {user: split[1], repo: split[2]};
}

export const fetchNumCommits = async (user: string, repo: string) => {
    return fetch(`https://api.github.com/repos/${user}/${repo}/commits?per_page=1`).then(i => {
        if (i.status === 403) throw error(403, i.statusText);
        return parseInt(i.headers.get('link')?.replace('>; rel=\"last\"', '').match(/\d+$/)?.[0] || '0')
    });
}

export const fetchCommit = async (user: string, repo: string, numCommits: number) => {
    return fetch(`https://api.github.com/repos/${user}/${repo}/commits?per_page=1&page=${numCommits}`).then(i => i.json()).then(i => i[0]);
}