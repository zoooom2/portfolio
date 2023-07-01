module.exports = {
  apps: [
    {
      name: 'baz-ng',
      script: 'server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
