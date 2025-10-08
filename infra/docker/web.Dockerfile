# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# Copy workspace and package files
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/config/eslint-config/package.json ./packages/config/eslint-config/
COPY packages/config/prettier-config/package.json ./packages/config/prettier-config/
COPY packages/config/tsconfig-base/package.json ./packages/config/tsconfig-base/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# Copy workspace config
COPY pnpm-workspace.yaml package.json ./

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /app/packages ./packages

# Copy shared config packages
COPY packages/config ./packages/config

# Copy web app
COPY apps/web ./apps/web

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the application
WORKDIR /app/apps/web
RUN pnpm build

# Stage 3: Runtime
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Install pnpm in runtime
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# Copy workspace files
COPY --from=builder /app/pnpm-workspace.yaml /app/package.json ./

# Copy dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages

# Copy built Next.js app
COPY --from=builder --chown=nextjs:nodejs /app/apps/web ./apps/web

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start Next.js in production mode
WORKDIR /app/apps/web
CMD ["pnpm", "start"]
