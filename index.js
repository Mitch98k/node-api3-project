// require your server and launch it
const server = require('./api/server');

const post = 5000;

server.listen(post, () => {
    console.log(`\n *** server listening on port ${5000} *** \n`);
});