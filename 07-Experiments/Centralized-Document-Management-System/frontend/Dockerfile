FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build step (Nếu bạn muốn chạy production)
# RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
