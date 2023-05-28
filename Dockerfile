FROM node:18.16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install && npm run build
# Set environment variables
ENV NODE_ENV=production

COPY --from=build /app/build /app/public

EXPOSE 3000
CMD ["npm", "run", "start"]
