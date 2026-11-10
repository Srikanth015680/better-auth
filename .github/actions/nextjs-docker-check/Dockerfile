# ============================================================
# BASE IMAGE
# ============================================================

# Use Node.js 22 on Alpine Linux.
# Alpine is a lightweight Linux distribution.
FROM node:22-alpine


# ============================================================
# WORKING DIRECTORY
# ============================================================

# Create /action as the working directory inside the container.
WORKDIR /action


# ============================================================
# COPY APPLICATION CODE
# ============================================================

# Copy index.js from the action directory into the container.
COPY index.js ./index.js


# ============================================================
# EXECUTION COMMAND
# ============================================================

# Start the JavaScript application when the container runs.
ENTRYPOINT ["node", "/action/index.js"]