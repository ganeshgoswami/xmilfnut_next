module.exports = {
  apps: [{
    name: 'xmilfnut',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3002,
      HOST: '0.0.0.0'
    }
  }]
};
