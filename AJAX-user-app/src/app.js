var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');


app.set('views', 'src/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

// app.get('/', function(request, response) {
//   fs.readFile('./resources/users.json', function(err, data) {
//     if (err) {
//       console.log(err);
//     };

//     var parsedData = JSON.parse(data);
//     console.log(parsedData);
//     response.render("index", {
//       people: parsedData.userInformation
//     });
//   });
// });

app.get('/', function(request, response) {
  var users = [];
  fs.readFile('./resources/users.json', 'utf-8', function(err, data) {
    if (err) {
      throw err;
    }
    users = JSON.parse(data);

    response.render('index', {
      people: users.userInformation
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


// var originalFile = './resources/users.json';


// function writeData ( newdata ) {
//  fs.writeFile(originalFile, JSON.stringify(newdata, null, 4), function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("JSON saved to ");
//   }
// }); 
// }

// fs.appendFileSync("file.txt", 'My Text \n', "UTF-8",{'flags': 'a+'});


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

// var newuser = {
//   firstname: "",
//   lastname: "",
//   email: "" 
// };
// app.post('/newuser', function (req, res) {
//   giveData( function(file) {
//     file.userInformation.forEach(function (user) {
//       if (req.body.FirstName === user.firstname && req.body.LastName === user.lastname) {
//         res.send("user already exist")
//       } else {
//         newuser.firstname = req.body.FirstName
//         newuser.lastname = req.body.LastName
//         newuser.email = req.body.email 
        
//       }
//     });
//     writeData (newuser);
//   });
// });
app.post('/newuser', bodyParser.urlencoded({
  extended: true
}), function(request, response) {

  fs.readFile('./resources/users.json', function(err, data) {
    if (err) {
      throw err;
    }
    users = JSON.parse(data);
    firstname = request.body.FirstName;
    lastname = request.body.LastName;
    email = request.body.email;

    newUser = {
      firstname: request.body.FirstName,
      lastname: request.body.LastName,
      email: request.body.email     
    };
    users.userInformation.push(newUser);

    fs.writeFile('./resources/users.json', JSON.stringify(users));
    response.redirect('/')
  });
});
app.listen(3000)
