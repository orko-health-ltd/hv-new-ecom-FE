module.exports = {
  apps: [{
    name: 'nuxt-app',
    script: '.output/server/index.mjs',
    instances: 1, // Use 1 instance for Nuxt (cluster mode not needed for Node 18+)
    exec_mode: 'fork', // Fork mode works better with Nuxt/Nitro
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: 'production',
      PORT: 3100,
      HOST: '0.0.0.0'
    },
    node_args: '--experimental-specifier-resolution=node',
    max_memory_restart: '1G',
    error_file: '/var/log/pm2/nuxt-error.log',
    out_file: '/var/log/pm2/nuxt-out.log'
  }]
}