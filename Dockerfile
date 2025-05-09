# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
# syntax=docker/dockerfile:1

# Builder stage
FROM node:lts-alpine AS builder
WORKDIR /app

# Install dependencies and build
COPY package.json package-lock.json tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:lts-alpine
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy built files
COPY --from=builder /app/dist ./dist

# Default environment variable (can be overridden)
ENV GITHUB_TOKEN=""

# Expose whatever ports if needed (stdio over stdio)

# Start the MCP server
CMD ["node", "dist/index.js"]
