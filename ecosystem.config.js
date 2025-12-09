module.exports = {
    apps: [
        {
            name: 'ptype',
            script: 'npm',
            args: 'start',
            cwd: './',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            // 从 .env 文件加载环境变量
            env_file: '.env',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
            },
            // 或者直接在这里定义生产环境变量（更安全）
            // env_production: {
            //   NODE_ENV: 'production',
            //   PORT: 3000,
            //   JWT_SECRET: 'your-production-jwt-secret',
            //   DATABASE_URL: 'your-production-database-url',
            // }
        }
    ]
};
