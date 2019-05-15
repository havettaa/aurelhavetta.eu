const { spawn } = require('child_process');
const handler = require('serve-handler');
const http = require('http');
const url = require('url');
const fs = require('fs');

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {  
  return handler(req, res);
	res.writeHead(200, {'Content-Type': 'text/html'});

/*	var q = url.parse(req.url, true);
	var filename = "." + q.pathname;
	fs.readFile(filename, function(err, data) {
	  if (err) {
			return res.end("404 Not Found");
	  }  
	  res.write(data);
	  return res.end();
	});
*/

 
	const bat = spawn('cmd.exe', ['/c', 'dir C:\\Users\\']);

	bat.stdout.on('data', (data) => {
	  res.write(data.toString());
	});
	
	bat.stderr.on('data', (data) => {
	  res.write(data.toString());
	});
	
	bat.on('exit', (code) => {
		res.end('\ncmd.exe Finished.\n');
	  console.log(`cmd.exe exited with code ${code}`);
	});
});


let cmd = spawn('cmd.exe', ['/C', 'powershell.exe -ExecutionPolicy ByPass "Get-Content c:\\windows\\WindowsUpdate.log"']);
cmd.stdout.on('data', (data) => {  console.log(data.toString());  });
cmd.stderr.on('data', (data) => {  console.log(data.toString());  });
cmd.on('exit', (code) => {  console.log(`cmd.exe exited with code ${code}`);  });

// Start the server on port 3000
app.listen(3000, '0.0.0.0');  
console.log('Node server running on port 3000'); 





