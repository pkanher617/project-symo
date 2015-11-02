var http = require('http'),
dispatcher = require('./httpdispatcher');
url = require("url"),
path = require("path"),
fs = require("fs");
qs = require("querystring");
var uuid = require("uuid");
var passwordHash = require('password-hash');

PORT = process.argv[2] || 8888; 

function existsSync(pth){
    try {
	data = fs.readFileSync(pth);
	return true;
    } catch (e) {
	return false;
    }
}

function handleRequest(request, response){//called whenever a clients requests data from our server
    try {
        console.log(request.url);
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

function renderPath(request,response){//outputs file contents corresponding to request to buffer response
    var uri = url.parse(request.url).pathname,
    filename = path.join(process.cwd()+'/content', uri);
    exists = existsSync(filename);
    if(!exists) {
	response.write("404 Not Found\n");
	return;
    }
    
    file = fs.readFileSync(filename, "binary");
    response.write(file, "binary");
}	   

function renderHTML(req,res){
    var uri = url.parse(req.url).pathname;
    q = url.parse(req.url,true).query;
    switch(uri){
    case "/landing.html":
	res.writeHead(200, {'Content-Type': 'text/html'});
	renderPath(req,res);
	res.end();
	break;
    default:
	res.writeHead(200, {'Content-Type': 'text/html'});
	renderPath(req,res);
	res.end();
    }
}

		    
dispatcher.setStatic('resources');

//give out html/css/js files whenever
dispatcher.onGet(/\//, function(req, res) {
    var uri = url.parse(req.url).pathname;
    pth = path.join(process.cwd() + '/content', uri);
    exists = existsSync(pth);
    if(!exists) {
	res.end();
	return;
    }
    if(req.url.indexOf('.html') != -1){ //req.url has the pathname, check if it conatins '.html'
	renderHTML(req,res);
	return;
	/*fs.readFile(pth, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
	});*/
	
    }
    
    if(req.url.indexOf('.js') != -1){ //req.url has the pathname, check if it conatins '.js'
	
	fs.readFile(pth, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
	});
	
    }
    
    if(req.url.indexOf('.css') != -1){ //req.url has the pathname, check if it conatins '.css'

	fs.readFile(pth, function (err, data) {
        if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
        res.end();
	});
    }
    
    if(req.url.indexOf('.jpg') != -1){ //req.url has the pathname, check if it conatins '.js'
	
	fs.readFile(pth, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
	});
	
    }

    if(req.url.indexOf('.png') != -1){ //req.url has the pathname, check if it conatins '.js'
	
	fs.readFile(pth, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
	});
	
    }
    
});	

//render the landing page
dispatcher.onGet("/landing.html", function(req, res) {
    q = url.parse(req.url,true).query;
    res.writeHead(200, {'Content-Type': 'text/html'});
    renderPath(req,res);
    res.end();
});    

dispatcher.onPost("/user/register", function(req, res) {
    var body = req.body;
    var data = qs.parse(body);
    var username = '1';
    var nickname = '2';
    var password = '3';
    // var username = data.Username;
    // var nickname = data.Nickname;
    // var hashedPassword = passwordHash.generate(qs.parse(data.Password));
    var cookie = uuid.v1();
    var cookies = Cookies(req,res);

    connection.query('SELECT * FROM `User` WHERE `username` = ?', [username], function(err, rows, fields) {
        var userExists = false;
        if (rows.length != 0) {
            userExists = true;
        } else {
            console.log("Can register!");
            connection.query('INSERT INTO `User` SET ?', {
                username: username,
                nickname: nickname,
                password: password,
                cookie: cookie
            }, function(err, result) {
                if (err) console.log(err);
                var id = result.insertId;
                // res.setCookie('token',cookie);
                // res.setHeader("Set-Cookie", ["token=cookie", "language=javascript"]);
                res.addCookie(new Cookie("token",cookie));
                // cookies.set('token', cookie);
                // cookies.set('name', username);
                // cookies.set('id', id);
            });
        }
        if (userExists) {
            res.writeHead(200, {
                "Content-Type": "text/plain"
            });
            res.end('User already exists');
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            res.end('ok');
        }
    });

});

dispatcher.onPost("/user/login", function(req, res) {
    var data = qs.parse(req.body);
    var username = data.Username;
    var password = data.Password;

    connection.query('SELECT * FROM `User` WHERE `username` = ?', [username], function(err, rows, fields) {
        if (rows.length == 0) {
            res.writeHead(200, {
                "Content-Type": "text/plain"
            });

            res.end('User does not exist');
        } else {
            if (passwordHash.verify(password, rows[0].password)) {
                res.writeHead(200, {
                    'Content-Type': 'text/html',
                });
                res.end('ok');
            } else {
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end('Password is not correct');
            }
        }
    })

})


dispatcher.onPost("/post1", function(req, res) {//this is included to show the onPost method in use
    //anything in here works just like it would in onGet
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Got Post Data');
});

dispatcher.onPost("/beginLevel", function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    var post = qs.parse(req.body);
    var userID = post.userID;
    var level = dbGetLevelNumber(userID);
    var difficulty = dbGetDifficulty(userID);
    res.write(JSON.stringify({success: true, level: level, difficulty: difficulty}));
    res.end();
});

dispatcher.onPost("/endLevel", function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    var post = qs.parse(req.body);
    var userID = post.userID;
    var level = post.level;
    var completed = post.completed;
    var timeTaken = post.timeTaken;
    var numTries = post.numTries;
    if (completed) {
        dbSetLevelNumber(userID, parseInt(level) + 1);
        dbRecordLevelStats(userID, level, completed, timeTaken, numTries);
    }
    res.write(JSON.stringify({success: true}));
    res.end();
});

function dbGetLevelNumber(userID) {
    // Fetch the level that the user is currently on from the database
    return 13; // Placeholder
}

function dbGetDifficulty(userID) {
    // Fetch the user's difficulty setting
    return 5;
}

function dbSetLevelNumber(userID, level) {
    // Set the user's current level in the database
    console.log(userID + " is now playing level " + level);
}

function dbRecordLevelStats(userID, level, completed, timeTaken, numTries) {
    // Track the statistics related to how well the user did on the level
    console.log(userID + " " + (completed ? "completed" : "gave up on") + " level " + level + " after " + timeTaken + " seconds and " + numTries + " tries");
}

var server = http.createServer(handleRequest);


var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3307,
    user: 'root',
    password: '',
    database: 'symo'
});

connection.connect();

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
