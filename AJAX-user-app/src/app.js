var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');


app.set('views', 'src/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/views'));

app.use(bodyParser.json());

app.get('/', function(request, response) {
  var users = [];
  fs.readFile('./resources/users.json', 'utf-8', function(err, data) {
    if (err) {
      throw err;
    }
    users = JSON.parse(data);

    response.render('index', {
      people: users
    });
  });
});

function giveData ( unicorn ) {
  fs.readFile('./resources/users.json', function(err, data) {
    if (err) {
      console.log(err);
    };
    var parsedData = JSON.parse(data);
    unicorn (parsedData);
  });
};



app.get('/search', function (req, res) {  
  res.render('search-form');
});

app.post('/search', function (req, res) { 
  giveData( function(file) {
    var allusers =[];
    console.log(req.body)

    file.userInformation.forEach(function (user){
      if ( req.body.name === user.firstname ) 
        allusers.push(user)
    })
    res.send(allusers)
  })
});

app.get('/newuser', function (req, res) {
  res.render('new-user')
});

app.get('/users/search', function(request, response) {
  response.render('search');
});



app.post('/newuser', bodyParser.urlencoded({
  extended: true
}), function(request, response) {

  fs.readFile('./resources/users.json', function(err, data) {
    if (err) {
      throw err;
    }
    users = JSON.parse(data);
    firstname = request.body.firstname;
    lastname = request.body.lastname;
    email = request.body.email;

    newUser = {
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      email: request.body.email     
    };
    users.push(newUser);

    fs.writeFile('./resources/users.json', JSON.stringify(users));
    response.redirect('/')
  });
});


app.post('/users/search', bodyParser.urlencoded({
  extended: true
}), function(request, response) {
  fs.readFile('./resources/users.json', 'utf-8', function(err, data) {
    if (err) {
      throw err;
    }
    users = JSON.parse(data);
    var results = [];
    for (i = 0; i < users.length; i++) {
      if ((users[i].firstname.indexOf(request.body.autocomplete) === 0) || (users[i].lastname.indexOf(request.body.lastautocomplete) === 0)) {
        results.push(users[i].firstname + " " + users[i].lastname)
      }
    }
    response.send(results)
  });
});

app.get('/users/searchresult', function(request, response) {
  fs.readFile('./resources/users.json', 'utf-8', function(err, data) {
    if (err) {
      throw err;
    }
    users = JSON.parse(data);
    var results = [];

    for (i = 0; i < users.length; i++) {
      if (users[i].FirstName === request.query.firstname || users[i].lastname === request.query.lastname) {
        results = results.concat(users[i]);
      }
    }
    response.render('searchresult', {
      results: results
    });
  });
});
app.listen(3000)
