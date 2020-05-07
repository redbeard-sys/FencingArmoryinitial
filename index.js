// /* App Configuration */
 var express = require('express');
 var bodyParser = require('body-parser');
 var bcrypt = require('bcrypt');
 var mysql = require('mysql');
 var session = require('express-session');
 //var nodemon = require('nodemon');

 var app = express();
    
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'top secret code!',
    resave: true,
    saveUninitialized: true
}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

/* Configure MySQL DBMS */
const connection = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'ba22fd18bfe794',
    password: 'f924d825',
    database: 'fencing_db'
});
connection.connect();

// /* Middleware */
function isAuthenticated(req, res, next){
    if(!req.session.authenticated) res.redirect('/login');
    else next();
}

function checkUsername(username){
    let stmt = 'SELECT * FROM users WHERE username=?';
    return new Promise(function(resolve, reject){
      connection.query(stmt, [username], function(error, results){
          if(error) throw error;
          resolve(results);
      }); 
    });
}

function checkPassword(password, hash){
    return new Promise(function(resolve, reject){
      bcrypt.compare(password, hash, function(error, result){
          if(error) throw error;
          resolve(result);
      }); 
    });
}

/* Home Route*/
app.get('/', function(req, res){
    res.render('home');
});


app.get('/location', function(req, res){
    res.render('location.html');
});


/* Login Routes */
app.get('/login', function(req, res){
    res.render('login');
});

app.get('/adminlog', function(req, res){
    res.render('adminlog');
});

app.post('/adminlog',function(req,res){
    let username = req.body.username;
    let password = req.body.password;
    if(username == 'admin' && password == 'password'){
   
        res.render('adminpage');
    } else {
        alert("Not admin");
    }
});



app.post('/login', async function(req, res){
    let isUserExist   = await checkUsername(req.body.username);
    let hashedPasswd  = isUserExist.length > 0 ? isUserExist[0].password : '';
    let passwordMatch = await checkPassword(req.body.password, hashedPasswd);
    if(passwordMatch){
        req.session.authenticated = true;
        req.session.user = isUserExist[0].username;
        res.redirect('/welcome');
    }
    else{
        res.render('login', {error: true});
    }
});

/* Register Routes */
app.get('/register', function(req, res){
    res.render('register');
});

app.post('/register', function(req, res){
    let salt = 10;
    bcrypt.hash(req.body.password, salt, function(error, hash){
        if(error) throw error;
        let stmt = 'INSERT INTO users (username, password) VALUES (?, ?)';
        let data = [req.body.username, hash];
        connection.query(stmt, data, function(error, result){
          if(error) throw error;
          res.redirect('/login');
        });
    });
});


// app.get('/', function(req, res){
//   var money = 'select price from prices';
//     connection.query(money, function(error, results) {
//         if(error) throw error;
//         var arr = [];
//         results.forEach(function(r) {
//             if (!arr.includes(r.price)) {
//                 arr.push(r.price);
//             }
//         });
        
//         res.render('home', {prices: arr});
//     });
// });

// app.get('/keyword', function(req, res){
//     var stmt = 'select * ' +
//               'from fencing_db ' +
//               'where itemToFix like\'%' + req.query.keyword + '%\';';
//     connection.query(stmt, function(error, results){
//         if(error) throw error;
//         var name = results[0].firstName + ' ' + results[0].lastName;
//         res.render('prices', {name: name, quotes: results});      
//     });
// });
app.get('/ticket', function(req,res){
    res.render('ticket');
});

app.post('/ticket', function(req, res) {
    console.log(req.body);
    connection.query('SELECT COUNT(*) FROM tickets;', function(error, result) {
        if(error) throw error;
        if(result.length){
            var ticketID = result[0]['COUNT(*)']+1;
            var stmt = 'INSERT INTO tickets' +
            '(ticketID, userID, brokenItem, problem)' + 'VALUES ' +
           // '(' 
                    // ticketID + ',"' +
                    //  req.body.userID + '","' +
                    //   req.body.brokenItem + '","' +
                    //   req.body.problem + '","' +
` ( '  ${ticketID}  ',
' ${req.body.userID}', '${req.body.brokenItem}', '${req.body.problem}' ) ;`
                  //    ');';
                         console.log(stmt);
            connection.query(stmt, function(error, result){
                if(error) throw error;
                res.redirect('/ticket');
            })
        }
    });
});

//possible delete
// app.get('/adminpage', function(req, res){
//     var stmt = 'SELECT * FROM users;';
//     console.log(stmt);
//     var tickets = null;
//     connection.query(stmt, function(error, results){
//         if(error) throw error;
//         if(results.length) tickets = results;
//         res.render('adminpage', {tickets: tickets});
//     });
// });

/* Admin Login */


/* Logout Route */
app.get('/logout', function(req, res){
   req.session.destroy();
   res.redirect('/');
});

/* Welcome Route */
    app.get('/welcome', isAuthenticated, function(req, res){
      res.render('welcome', {user: req.session.user}); 
    });
    
  
/* Error Route*/
app.get('*', function(req, res){
   res.render('error'); 
});

app.listen(process.env.PORT || 3000, function(){
    console.log('Server has been started');
})