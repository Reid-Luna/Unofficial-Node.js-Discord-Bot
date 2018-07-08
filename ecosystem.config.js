module.exports = {
  apps: [{
    name: "Node.js Bot",
    script: "index.js", // the entry point of your app
    env: {
      // ALL ENVIRONMENT VARIABLES THAT SHARED BETWEEN ALL ENVIRONMENT
      COMMON_VARIABLE: "true"
    },
    env_production: {
      // ENVIRONMENT VARIABLES FOR PRODUCTION
      NODE_ENV: "production"
    },
    env_staging: {
      // ENVIRONMENT VARIABLES FOR STAGING
    }
  }],

  deploy: {
    production: {
      user: "deploy",
      host: "104.207.129.121",
      ref: "origin/master",
      repo: "https://github.com/UnofficialNodejsDiscord/Unofficial-Node.js-Discord-Bot.git", // YOUR APPLICATION REPO
      path: "/home/deploy/nodejsbot",
      "post-deploy": "npm install ; pm2 startOrRestart ecosystem.config.js --env production"
    },
    staging: {
      user: "deploy",
      host: "104.207.129.121",
      ref: "origin/master",
      repo: "https://github.com/UnofficialNodejsDiscord/Unofficial-Node.js-Discord-Bot.git", // YOUR APPLICATION REPO
      path: "/home/deploy/nodejsbot",
      "post-deploy": "npm install ; pm2 startOrRestart ecosystem.config.js --env dev"
    }
  }
};
