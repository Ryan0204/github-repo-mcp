#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { Octokit } from "octokit";

const octokit = new Octokit({});

function parseGitHubUrl(url: string) {
  const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
  const match = url.match(regex);
  if (!match) {
    throw new Error("Invalid GitHub repository URL");
  }
  const [, owner, repo] = match;
  return { owner, repo: repo.replace(".git", "") };
}

const server = new McpServer({
  name: "Github Repo MCP",
  version: "1.0.0",
});

server.tool(
  "getRepoAllDirectories",
  {
    repoUrl: z.string().url().describe("The URL of the Github repo"),
  },
  async ({ repoUrl }, extra) => {
    try {
      const { owner, repo } = parseGitHubUrl(repoUrl);
      
      const { data } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: "",
      });

      // Format the response
      const items = Array.isArray(data) ? data.map(item => ({
        name: item.name,
        type: item.type,
        path: item.path,
      })) : [];

      const itemsDisplay = JSON.stringify(items, null, 2);

      return {
        content: [
          {
            type: "text",
            text: `Repository root contents for ${owner}/${repo}:\n\n${itemsDisplay}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error fetching repo:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error fetching repo: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }
);

server.tool(
  "getRepoDirectories",
  {
    repoUrl: z.string().url().describe("The URL of the Github repo"),
    path: z.string().describe("The directory path to fetch"),
  },
  async ({ repoUrl, path }, extra) => {
    try {
      const { owner, repo } = parseGitHubUrl(repoUrl);
      
      const { data } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path,
      });

      // Format the response
      const items = Array.isArray(data) ? data.map(item => ({
        name: item.name,
        type: item.type,
        path: item.path,
      })) : [];

      const itemsDisplay = JSON.stringify(items, null, 2);

      return {
        content: [
          {
            type: "text",
            text: `Contents for ${path} in ${owner}/${repo}:\n\n${itemsDisplay}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error fetching directory:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error fetching directory: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }
);

server.tool(
  "getRepoFile",
  {
    repoUrl: z.string().url().describe("The URL of the Github repo"),
    path: z.string().describe("The file path to fetch"),
  },
  async ({ repoUrl, path }, extra) => {
    try {
      const { owner, repo } = parseGitHubUrl(repoUrl);
      
      const { data } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path,
      });

      // For files, data won't be an array
      if (Array.isArray(data) || data.type !== 'file') {
        throw new Error("Requested path is not a file");
      }

      // Get content and decode if base64
      let content = "";
      if (data.encoding === 'base64' && data.content) {
        content = Buffer.from(data.content, 'base64').toString('utf-8');
      } else if (data.content) {
        content = data.content;
      }

      // Check for binary files
      const fileExtension = path.split('.').pop() || "txt";
      const isBinary = /^(jpg|jpeg|png|gif|bmp|ico|webp|mp3|mp4|wav|ogg|pdf|zip|tar|gz|rar|exe|dll|so|bin)$/i.test(fileExtension);
      
      if (isBinary) {
        return {
          content: [
            {
              type: "text",
              text: `File ${path} appears to be a binary file and cannot be displayed as text.`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `File content for ${path} in ${owner}/${repo}:\n\n${content}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error fetching file:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error fetching file: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }
);


// Connect using stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
