FROM public.ecr.aws/docker/library/node:21.1.0
WORKDIR /app
ENV PORT 3000
EXPOSE 3000

RUN npm install -g npm@7

COPY package.json ./
COPY package-lock.json ./
RUN npm i  --pure-lockfile
COPY . .
RUN npx blitz prisma generate
RUN npx blitz codegen
RUN npx blitz build

RUN chmod +x start.sh
CMD ["./start.sh"]