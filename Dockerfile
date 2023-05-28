FROM node:18.16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm run build
# list dir
RUN ls -al

# Set environment variables
ENV NODE_ENV=production

# only copy build folder to container
COPY --from=0 /app/build ./build

EXPOSE 3000
CMD ["npm", "run", "start"]
