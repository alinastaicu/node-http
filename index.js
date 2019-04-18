const http = require('http'); //use http node module

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  //set up the server , createServer is a methode with is taking a function as a param req, res
  console.log(req.headers); // req give as access to the header

  res.statusCode = 200; //enable us to set up for the response message
  res.setHeader('Conten-Type', 'text/html'); //response body will be formated to html
  res.end('<html><body><h1>Hello, Word!</html></body></h1>'); //end the response, this information will sended to the client
});

server.listen(port, hostname, () => {
  // start the server
  console.log(`Server running at http://${hostname}:${port}`);
});
