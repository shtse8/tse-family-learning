# Explicit production image for Family Learning Hub.
# Keep this app on the standard Node/npm path; the generated Sylphx
# buildpack previously attempted a Bun install in an image without Bun.
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package.json ./
RUN npm install --omit=dev --ignore-scripts

COPY index.html questions.json server.js FAMILY_LEARNING_HUB_ROADMAP.md ./

EXPOSE 3000
CMD ["node", "server.js"]
