

######################################
# *** BUILD FOR LOCAL DEVELOPMENT **
######################################

FROM --platform=$BUILDPLATFORM node:18-alpine As development

# Crear directorio de aplicaciones
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm install --force
COPY --chown=node:node . .



######################################
# *** BUILD FOR PRODUCTION ***
######################################

FROM --platform=$BUILDPLATFORM node:18-alpine As build

WORKDIR /app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
RUN ls -alt


# FROM --platform=$BUILDPLATFORM node:18-alpine As deps_prod

# WORKDIR /app
# COPY --chown=node:node package*.json ./
# RUN npm install --prod --force
# COPY --chown=node:node . .



######################################
# *** PRODUCTION ***
######################################

FROM --platform=$BUILDPLATFORM nginx:alpine3.17 As prod

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

COPY --chown=node:node --from=build /app/dist/snv-admin-frontend /usr/share/nginx/html


EXPOSE 80

# Start the server using the production build
# CMD [ "node", "dist/main.js" ]
