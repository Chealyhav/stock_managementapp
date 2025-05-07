# Stage 1 - Build frontend
FROM node:18 AS frontend
WORKDIR /app/src
COPY src/package*.json ./
RUN npm install
COPY src .
RUN npm run build

# Stage 2 - Setup backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# Copy built frontend from Stage 1
COPY --from=frontend /src/dist ./public

EXPOSE 3003
CMD ["node", "server.js"]
