module.exports = {
    apps: [{
        name: 'hyperspace-netmanagement',
        script: './server.js', // ton serveur Express
        instances: 'max',
        autorestart: true,
        watch: false,
        max_memory_restart: '300M',
        env: {
            NODE_ENV: 'production',
            PORT: 3000
        }
    }]
};