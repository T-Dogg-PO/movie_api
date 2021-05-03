// Import the modules required to run the server
const http = require('http'),
fs = require('fs'),
url = require('url');

// Create a new server
http.createServer((request, response) => {
    // Store the request url in addr, and parse it using the url module
    let addr = request.url,
    q = url.parse(addr, true),
    filePath = '';

    // Append the URL and Timestamp to the log.txt file, and log errors to the console if there are any
    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Added to log.');
        }
    });

    // Check the parsed URL for keywords, and load the correct html page based on those keywords
    if (q.pathname.includes('documentation')) {
        filePath = (__dirname + '/documentation.html');
    } else {
        filePath = 'index.html';
    }

    // Read the file from filePath, stopping if an error is encountered
    fs.readFile(filePath, (err, data) => {
        if (err) {
            throw err;
        }

        // 
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
    });
}).listen(8080);

console.log('My first Node test server is running on Port 8080.');