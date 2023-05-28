FROM node:18.16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
# Set environment variables
ENV NODE_ENV=production

# Build the application
RUN npm run build

COPY --from=build /app/build /app/public

EXPOSE 3000
CMD ["npm", "run", "start"]
