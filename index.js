// import server module
const server = require('./server.js');

// start server listening on port 1337
server.listen(1337, () => {
    console.log('\n*** Server Running on http://localhost:1337 ***\n');
  });