# Stage 1

FROM node:16 as build-stage

ARG REACT_APP_API_BASE_URL=http://54.163.115.142:5000/api

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm install

COPY . .

ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

# for low ram deployment with extra swap storage on ec2
ENV NODE_OPTIONS=--max_old_space_size=1024 

RUN npm run build

# Stage 2

FROM nginx:1.21.0-alpine 

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]