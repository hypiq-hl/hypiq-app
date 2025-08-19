module.exports = {
  apps: [{
    name: 'hypiq-app-prod',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/hypiq-app',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3004
    }
  }]
}
