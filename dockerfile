

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
ENV NODE_ENV production
RUN npm cache clean --force



# FROM --platform=$BUILDPLATFORM node:18-alpine As deps_prod

# WORKDIR /app
# COPY --chown=node:node package*.json ./
# RUN npm install --prod --force
# COPY --chown=node:node . .



######################################
# *** PRODUCTION ***
######################################

FROM --platform=$BUILDPLATFORM nginx:alpine3.17-slim As prod
# EXPOSE 3000
# Copy the bundled code from the build stage to the production image
# COPY --chown=node:node --from=deps_prod /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist/snv-admin-frontend /usr/share/nginx/html

# comentar luego debe tomar las variables del servidor
# COPY --chown=node:node --from=build /app/.env ./

# Start the server using the production build
# CMD [ "node", "dist/main.js" ]
