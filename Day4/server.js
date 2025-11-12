// http module is used to create a server
const http = require('http');

// createServer
const server = http.createServer((req, res) => {

    // if the url is / then the server will respond with " / route is accessed"
    if (req.url === '/') {
        res.end(" / route is accessed");
    }
    // if the url is /about then the server will respond with " /about route is accessed"
    else if (req.url === '/about') {
        res.end('/about route is accessed');

    }
    // if the url is /contact then the server will respond with " /contact route is accessed"
    else if (req.url === '/contact') {
        res.end('/contact route is accessed');
    }
    // if the url is not /, /about, /contact then the server will respond with "404 page not found"
    else {
        res.end('404 page not found');
    }

})


// server is listening to port 3000
server.listen(3000, () => {
    console.log('Server is running on port 3000');
})