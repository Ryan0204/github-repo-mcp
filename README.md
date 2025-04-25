# GitHub Repo MCP

[![smithery badge](https://smithery.ai/badge/@Ryan0204/github-repo-mcp)](https://smithery.ai/server/@Ryan0204/github-repo-mcp)

<p class="center-text">
  <strong>GitHub Repo MCP is an open-source MCP server that lets your AI assistants browse GitHub repositories, explore directories, and view file contents.</strong>
</p>

<a href="https://glama.ai/mcp/servers/@Ryan0204/github-repo-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@Ryan0204/github-repo-mcp/badge" alt="github-repo-mcp MCP server" />
</a>

## Table of contents

<p class="center-text">
  <a href="#getting-started">Getting started</a> •
  <a href="#feature-overview">Feature overview</a>
</p>

## ✨ Key features

- 💻 Compatible with Cursor, Windsurf, Claude Desktop, and other MCP clients supporting `stdio` protocol
- 🔎 Browse the contents of any public GitHub repository
- 📂 Navigate through repository directories and subdirectories
- 📝 View the content of code and text files
- 📦 Easy installation via package manager

## Getting Started

### Prerequisites

Installing the server requires the following on your system:
- Node.js 18+
- npm or yarn

### Step 1. Installation

You can install and run GitHub Repo MCP using Smithery, NPX, or setting in mcp.json of your IDE:

#### Installing via Smithery

To install GitHub Repo MCP for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@Ryan0204/github-repo-mcp):

```bash
npx -y @smithery/cli install @Ryan0204/github-repo-mcp --client claude
```

#### MacOS

```bash
npx github-repo-mcp
```

#### Windows NPX

```bash
cmd /c npx -y github-repo-mcp
```

#### Windows NPX via .cursor/mcp.json

```json
{
  "mcpServers": {
    "github-repo-mcp": {
      "command": "wsl",
      "args": [
        "bash",
        "-c",
        "cmd /c npx -y github-repo-mcp"
      ],
      "enabled": true
    }
  }
}
```

#### Windows NPX via .cursor/mcp.json (if path not set)

```bash
# Find the full path to npx first
which npx
```

```json
{
  "mcpServers": {
    "github-repo-mcp": {
      "command": "wsl",
      "args": [
        "bash",
        "-c",
        "'/home/[username]/.nvm/versions/node/v20.18.0/bin/npx github-repo-mcp'"
      ],
      "enabled": true
    }
  }
}
```


Wait a few seconds or click on the refresh button a few times if it does not register. If it still won't register, make sure you entered the right command.

### Step 2. Configuration

The GitHub Repo MCP server can use a GitHub token for higher rate limits when accessing the GitHub API.

#### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GITHUB_TOKEN` | No | None | Your GitHub personal access token for higher rate limits |

#### Setting Up a GitHub Token (Optional)

While the server works without authentication, GitHub API has rate limits that are much lower for unauthenticated requests. To increase your rate limit:

1. Create a personal access token at https://github.com/settings/tokens
2. Set the token as an environment variable in mcp.json:

```json
{
  "mcpServers": {
    "github-repo-mcp": {
      "command": "...",
      "args": [
        ...
      ],
      "env": {
        "GITHUB_TOKEN": "Your_Github_Token"
      }
      "enabled": true,
    }
  }
}
```

## Feature Overview

### Repository Browsing Tools

The server provides three main tools for interacting with GitHub repositories:

#### 1. `getRepoAllDirectories`

Lists all files and directories at the root of a GitHub repository.

- **Parameters**:
  - `repoUrl`: The URL of the GitHub repository (e.g., "https://github.com/owner/repo")

#### 2. `getRepoDirectories`

Lists contents of a specific directory in a GitHub repository.

- **Parameters**:
  - `repoUrl`: The URL of the GitHub repository
  - `path`: The directory path to fetch (e.g., "src")

#### 3. `getRepoFile`

Retrieves and displays the content of a specific file from a GitHub repository.

- **Parameters**:
  - `repoUrl`: The URL of the GitHub repository
  - `path`: The file path to fetch (e.g., "src/index.js")

### Usage Examples

Here are some examples of how to use these tools with an AI assistant:

1. **Browsing a repository root**:
   Ask your AI assistant to "Show me the contents of the repository at https://github.com/Ryan0204/github-repo-mcp"

2. **Exploring a specific directory**:
   Ask "What files are in the src directory of https://github.com/Ryan0204/github-repo-mcp?"

3. **Viewing a file**:
   Ask "Show me the README.md file from https://github.com/Ryan0204/github-repo-mcp"

### Limitations

- **Rate Limiting**: Without authentication, GitHub API has strict rate limits (60 requests per hour)
- **Private Repositories**: Can only access public repositories unless a token with appropriate permissions is provided
- **Binary Files**: The server detects common binary file extensions and won't display their contents
- **Large Files**: GitHub API has limitations on the size of files that can be retrieved

## Troubleshooting

Here are some common issues and their solutions:

- **Rate limit exceeded**: Set up a GitHub token as described in the Configuration section
- **Command not found**: Ensure the package is installed globally
- **Connection errors**: Check your internet connection and GitHub API status

If you encounter any issues, please check the output for error messages or create an issue in the GitHub repository.

---

Enjoy! ☺️ 