import fastify from 'fastify';
import axios from 'axios';
import * as cheerio from 'cheerio';

const server = fastify();

console.log('working');
console.log('another');

// fetch('').then(i => {
//     console.log(i);
// })
server.get('/:user/:repo', async (request) => {
    const { user, repo } = request.params as {user: string, repo: string};
    const numCommits = await axios.get(`https://api.github.com/repos/${user}/${repo}/commits?per_page=1`).then(i => i.headers.link?.replace('>; rel=\"last\"', '').match(/\d+$/)?.[0]);
    const firstCommit = await axios.get(`https://api.github.com/repos/${user}/${repo}/commits?per_page=1&page=${numCommits}`).then(i => i.data);
    return { hello: 'world', user, repo, numCommits, firstCommit}
});

server.listen({port: 3000});