module.exports = {
  apps: [
    {
      name: 'nuxt-app',
      script: '.output/server/index.mjs',
      instances: 'max', // Adjust instances as needed
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3100, // Change port as needed
      },
      node_args: '--experimental-specifier-resolution=node',
    },
  ],
}
