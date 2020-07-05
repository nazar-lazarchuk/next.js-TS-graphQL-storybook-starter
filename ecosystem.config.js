module.exports = {
  apps: [{
    name: 'develop',
    script: 'npm',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  },
  {
    name: 'staging',
    script: 'npm',
    args: 'run staging',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }
  ],

  deploy: {
  }
};
