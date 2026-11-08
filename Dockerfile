
# Use Node.js runtime
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Production environment
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy Next.js standalone build
COPY .next/standalone ./

# Copy static assets
COPY .next/static ./.next/static

# Copy public assets
COPY public ./public

# Expose application port
EXPOSE 3000

# Start Next.js application
CMD ["node", "server.js"]
