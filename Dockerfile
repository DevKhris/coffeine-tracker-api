### DEVELOPMENT STAGE
FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY --chown=node:node . .

EXPOSE 3030

USER node

### STAGGING STAGE
FROM node:18-alpine as stagging

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV APP_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

### PRODUCTION STAGE
FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}}

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]