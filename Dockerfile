#Build Steps
FROM node:alpine3.10 as build-step

RUN mkdir /github-repos
WORKDIR /github-repos

COPY package.json /github-repos
RUN yarn
COPY . /github-repos

RUN yarn build

#Run Steps
FROM nginx:1.19.8-alpine  
COPY --from=build-step /github-repos/build /usr/share/nginx/html
