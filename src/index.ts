import fastify from 'fastify';
import axios from 'axios';

const server = fastify();

server.get('/:user/:repo', async (request) => {
    const { user, repo } = request.params as {user: string, repo: string};
    const numCommits = await axios.get(`https://api.github.com/repos/${user}/${repo}/commits?per_page=1`).then(i => i.headers.link?.replace('>; rel=\"last\"', '').match(/\d+$/)?.[0]);
    const firstCommit = await axios.get(`https://api.github.com/repos/${user}/${repo}/commits?per_page=1&page=${numCommits}`).then(i => i.data);
    return { numCommits, firstCommit: firstCommit[0] || null}
});

server.listen({port: 3000});