
######################################
# *** BUILD LOCAL***
######################################

FROM node:18-alpine As dev

# Crear directorio de aplicaciones
WORKDIR /app
COPY package.json ./

# Instale las dependencias de la aplicación usando el comando `npm ci` en lugar de `npm install`
RUN yarn install --force --frozen-lockfile

CMD [ "yarn", "start:dev" ]




######################################
# *** BUILD FOR LOCAL DEVELOPMENT **
######################################

FROM --platform=$BUILDPLATFORM node:18-alpine As development

# Crear directorio de aplicaciones
WORKDIR /app

# Copie los manifiestos de dependencia de la aplicación en la imagen del contenedor.
# Se utiliza un comodín para garantizar la copia de ambos, package.json Y package-lock.json (cuando esté disponible).
# Copiar esto primero evita volver a ejecutar npm install en cada cambio de código.
COPY --chown=node:node package*.json ./

# Instale las dependencias de la aplicación usando el comando `npm ci` en lugar de `npm install`
RUN yarn install --force

# Fuente de la aplicación del paquete
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
# USER node



######################################
# *** BUILD FOR PRODUCTION ***
######################################

FROM --platform=$BUILDPLATFORM node:18-alpine As build

WORKDIR /app

COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN yarn build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
# npm remove --only=production && 
RUN npm cache clean --force
# USER node



FROM --platform=$BUILDPLATFORM node:18-alpine As deps_prod

WORKDIR /app

COPY --chown=node:node package*.json ./

# install prod dependencies
RUN yarn install --prod --force

# copiar source code
COPY --chown=node:node . .



######################################
# *** PRODUCTION ***
######################################

FROM --platform=$BUILDPLATFORM node:18-alpine As prod
# EXPOSE 3000
# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=deps_prod /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

# comentar luego debe tomar las variables del servidor
# COPY --chown=node:node --from=build /app/.env ./

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
