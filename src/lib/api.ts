export const parsePathParams = (url: string): {user: string, repo: string} => {
    const split = url.split('/');
    return {user: split[1], repo: split[2]};
}

export const fetchNumCommits = async (user: string, repo: string) => {
    return fetch(`https://api.github.com/repos/${user}/${repo}/commits?per_page=1`).then(i => i.headers.get('link')?.replace('>; rel=\"last\"', '').match(/\d+$/)?.[0]).then((i: string) => parseInt(i));
}

export const fetchCommit = async (user: string, repo: string, numCommits: number) => {
    return fetch(`https://api.github.com/repos/${user}/${repo}/commits?per_page=1&page=${numCommits}`).then(i => i.json()).then(i => i[0]);
}