import { json, type RequestEvent } from '@sveltejs/kit';
import * as simpleUser from './simple-user.json';
import * as gitUser from './git-user.json';
import * as commit from './commit.json';
import * as diff from './diff.json';
import * as verification from './verification.json';

export const GET = async (event: RequestEvent) => {

    const parameters = [
        {
            "name": 'user',
            "in": "path",
            "required": true,
            "type": "string",
            "default": "GitKraken-Tools"    
        },
        {
            "name": 'repo',
            "in": "path",
            "required": true,
            "type": "string",
            "default": "open-in-gitkraken"
        }
    ]
    
    const tags: any[] = [
        {
            name: "commit",
            description: "Get information about the first commit"
        },
        {
            name: "repo",
            description: "Get information about the repository"
        }
    ];

    const paths: any = {
        '/{user}/{repo}/sha': {
            get: {
                tags: ['commit'],
                description: "Return only the commit SHA",
                produces: ["application/text"],
                parameters,
                responses: {
                    200: {
                      description: "successful operation",
                      type: "string"
                    },
                },
            }
        },
        '/{user}/{repo}/verbose': {
            get: {
                tags: ['commit'],
                description: "Return the full commit data provided by the GitHub API",
                produces: ["application/json"],
                parameters,
                responses: {
                    200: {
                      description: "successful operation",
                      schema: {
                        $ref: `#/definitions/commit`,
                      },
                    },
                },
            }
        },
        '/{user}/{repo}/numCommits': {
            get: {
                tags: ['repo'],
                description: "Return the amount of commits in the repo",
                produces: ["application/text"],
                parameters,
                responses: {
                    200: {
                      description: "successful operation",
                      type: "number"
                    },
                },
            }
        }
    };

    const definitions: any = {
        "commit": commit,
        "nullable-simple-user": simpleUser,
        "nullable-git-user": gitUser,
        "diff-entry": diff,
        "verification": verification
    };

    return json({
        swagger: "2.0",
        info: {
            title: "GitHub First Commit API",
            version: "1.0.0"
        },
        host: event.url.host,
        basePath: "/",
        schemes: ["https", "http"],
        tags,
        paths,
        definitions
    });
}