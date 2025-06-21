# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies including build tools
RUN apk add --no-cache git

# Copy package files first for better caching
COPY package.json package-lock.json ./
RUN npm ci --include=dev

# Copy all files
COPY . .

# Build
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]