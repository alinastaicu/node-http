const http = require('http'); //use http node module
const fs = require('fs'); // read and wrrite files
const path = require('path'); // path of the file

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  //set up the server , createServer is a methode with is taking a function as a param req, res
  console.log('Request for' + req.url + ' by method ' + req.method);

  if (req.method == 'GET') {
    var fileUrl;
    if (req.url == '/') fileUrl = '/index.html';
    else fileUrl = req.url;

    var filePath = path.resolve('./public' + fileUrl);
    const fileExt = path.extname(filePath);
    if (fileExt == '.html') {
      fs.exists(filePath, exists => {
        if (!exists) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'text/html');
          res.end('<html><body><h1>Error 404: ' + fileUrl + ' not found </h1></body></html>');

          return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body><h1>Error 404: ' + fileUrl + ' not an HTML file</h1></body></html>');

      return;
    }
  } else {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Error 404: ' + fileUrl + ' not supported </h1></body></html>');

    return;
  }
});

server.listen(port, hostname, () => {
  // start the server
  console.log(`Server running at http://${hostname}:${port}`);
});
