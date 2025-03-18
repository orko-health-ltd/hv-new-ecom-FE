module.exports = {
  apps: [{
    name: 'nuxt-app',
    script: '.output/server/index.mjs',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    // Default environment (optional)
    env: {
      NODE_ENV: 'development',
      PORT: 3050,
    },
    // Production environment
    env_production: {
      NODE_ENV: 'production',
      PORT: 3100,  // <-- This is used when --env production is specified
      HOST: '0.0.0.0'
    },
    //node_args: '--experimental-specifier-resolution=node',
    node_args: '--experimental-specifier-resolution=node --loader ts-node/esm', // Add ESM support
    max_memory_restart: '1G',
    error_file: '/var/log/pm2/nuxt-error.log',
    out_file: '/var/log/pm2/nuxt-out.log'
    //Ishmam Bin Azim
  }]
}