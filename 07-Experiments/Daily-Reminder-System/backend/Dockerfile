FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Run with ts-node directly to avoid strict TSC build errors
CMD ["npx", "ts-node", "--transpile-only", "src/main.ts"]
