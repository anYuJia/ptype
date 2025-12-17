# 基础镜像
FROM node:20-alpine AS base

# 仅安装生产依赖
FROM base AS deps
# 查看 https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine 了解为什么需要 libc6-compat
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 根据首选包管理器安装依赖
COPY package.json package-lock.json* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 仅在需要时重新构建源代码
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 在构建期间禁用遥测
ENV NEXT_TELEMETRY_DISABLED 1

# 生成 Prisma 客户端
RUN npx prisma generate

# 构建应用程序
RUN npm run build

# 生产环境镜像，复制所有文件并运行 Next.js
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制 public 文件夹
COPY --from=builder /app/public ./public

# 设置预渲染缓存的正确权限
RUN mkdir .next
RUN chown nextjs:nodejs .next

# 自动利用输出追踪来减少镜像大小
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
