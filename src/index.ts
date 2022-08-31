import fastify from 'fastify';
import axios from 'axios';
import * as cheerio from 'cheerio';

const server = fastify();

console.log('working');
console.log('another');

// fetch('').then(i => {
//     console.log(i);
// })

server.get('/:user/:repo', (request) => {
    const { user, repo } = request.params as {user: string, repo: string};
    return { hello: 'world', user, repo }
});

server.listen({port: 3000});