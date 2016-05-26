var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');


app.set('views', 'src/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/views'));

// app.use(bodyParser.json());
//app.use(bodyParser.urlencoded())

app.use(bodyParser.urlencoded({
  extended: true
}));

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
    console.log(req.body.name)

    file.forEach(function (user){
      if ( req.body.name === user.firstname || req.body.email === user.email ) 
        allusers.push(user)
    })
    res.send(allusers)
  })
});
app.get('/users/userfound', function (req, res) {
  res.render('userfound',{results: "bloop"})
});
app.get('/newuser', function (req, res) {
  res.render('new-user')
});

app.get('/users/search', function(request, response) {
  response.render('search');
});

app.post('/users/userfound', bodyParser.urlencoded({
  extended: true
}), function(request, response) {
  fs.readFile('./resources/users.json', function(err, data) {
    if (err) {
      throw err;
    }
    console.log("bloops")
    users = JSON.parse(data);
    var results = [];
    
    for (var i = 0; i < users.length; i++) {

      console.log(request.body)
      if (users[i].firstname.indexOf(request.body.choices) != -1 || users[i].lastname.indexOf(request.body.choices) != -1) {
    
        results.push(users[i].firstname + " " + users[i].lastname)


      }
    };
    console.log(results)
    response.render('userfound', {results:results})
  });
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
    console.log("setp 1")
    for (i = 0; i < users.length; i++) {
      console.log('step 2')
      console.log('Index returned: ' + users[i].firstname.indexOf(request.body.autocomplete) )
      if ((users[i].firstname.indexOf(request.body.autocomplete) != -1) || (users[i].lastname.indexOf(request.body.autocomplete) != -1)) {
        console.log('if triggered')
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
    console.log('banana')
    console.log(request.query.firstname);

    for (i = 0; i < users.length; i++) {
      if (users[i].firstName === request.query.firstname || users[i].lastname === request.query.lastname) {
        results = results.concat(users[i]);
      }
    }
    response.render('userfound', {
      results: results
    });
  });
});


app.listen(3000)
