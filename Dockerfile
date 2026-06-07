FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY index.html questions.json manifest.webmanifest sw.js server.js package.json ./
COPY content-packs ./content-packs

EXPOSE 3000
CMD ["node", "server.js"]
