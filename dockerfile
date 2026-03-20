FROM oven/bun:1
WORKDIR /usr/src/app

# install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# install with --production (exclude devDependencies)
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# copy node_modules
# then copy all (non-ignored) project files into the image
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
RUN bun test

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "index.ts" ]