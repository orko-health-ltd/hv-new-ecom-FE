module.exports = {
  apps: [
    {
      name: 'nuxt-app',
      script: '.output/server/index.mjs',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'development',
        PORT: 3050,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOST: '0.0.0.0',
      },
      node_args: '--experimental-specifier-resolution=node',
      max_memory_restart: '1G',
      error_file: '/dev/stderr',
      out_file: '/dev/stdout',
    },
  ],
}
