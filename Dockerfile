# Stage 1: Build React App
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npx update-browserslist-db@latest
COPY . .
RUN npm run build

# Stage 2: Serve React App
FROM node:18-alpine AS runner

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy build folder from builder
COPY --from=builder /app/build ./build

# Expose port
EXPOSE 3000

# Serve app
CMD ["serve", "-s", "build", "-l", "3000"]
