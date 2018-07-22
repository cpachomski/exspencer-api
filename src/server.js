const { GraphQLServer } = require('graphql-yoga');
const api = require('./api');
const chalk = require('chalk');

require('./db');

const serverOpts = {
  port: process.env.PORT || '3030',
  endpoint: '/api/graphql',
  playground: '/fun',
  tracing: process.env.NODE_ENV === 'production' ? false : true,
  debug: process.env.NODE_ENV === 'production' ? false : true
};

const server = new GraphQLServer(api);
server.start(serverOpts, ({ port }) =>
  console.log(`
		${chalk.cyanBright(`Serving up something good on port:${port}...`)}
		${chalk.cyan(`Enviornment: ${chalk.white(process.env.NODE_ENV)}`)}
		`)
);
