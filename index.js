const express = require('express');
const mustache = require('mustache-express');
const User = require('./schema.js').User;
const Address = require('./schema.js').Address;
const Phone = require('./schema.js').Phone;
const Message = require('./schema.js').Message;
const Like = require('./schema.js').Like;
const Replie = require('./schema.js').Replie;
const Sequelize = require('sequelize');
const bodyparser = require('body-parser');
const session = require('express-session');
const server = express();
const db = new Sequelize('gabble', '', '', {
  host: 'localhost',
  dialect: 'postgres',
});

// const models = require("./models");
server.use(express.static('./public'));
server.set('views', __dirname + '/views');
server.use(bodyparser.urlencoded({ extended: false }));
server.engine('mustache', mustache());
server.set('view engine', 'mustache');
server.use(session({ secret: 'mjkhbki76gvftyjuu66bnA9ou7g', resave: true,
  saveUninitialized: false, }));
server.use(function (req, res, next) {
  res.locals.currentUser = req.session.userid;
  next();
});

function createUser(data) {
  //console.log('This is from inside the function');
  return User.create({ username: data.username,
    password: data.password, first_name: data.first_name, last_name: data.last_name, });
};

function createAddress(data) {
  return User.findOne({
    where: {
      username: data.username,
    },
  }).then(function (result) {
    //console.log(result);
    return Address.create({ address1: data.address1, address2: data.address2,
      city: data.city, state: data.states, zipcode: data.zipcode, })
      .then(function (address) {
      address.setUser(result);

      //console.log('The address was added');
    }).catch(function (err) {
      console.log(err);
    });
  });
};

// function checkUserInput(data) {
//   let check = ['<', ';', '&&',  '&', '|', '>', '`', '/', ',', '(', ')',
//        '{', '}', '#', '!', '*', '%', '$', '^', '[', ']', '~'];
//   for (let i = 0; i < data.username.length; i++) {
//     console.log('Inside the data loop');
//     for (let j = 0; j < check.length; j++) {
//       console.log('inside check loop');
//       if (data[i] === check [j]) {
//         console.log('It worked!');
//         console.log(data[i].value);
//         console.log(data.body);
//         console.log(check[j].value);
//       }
//     }
//
//   }
//
//   return findUserId(data);
// };

function findUserId(data) {
  return User.findOne({
    where: {
      username: data.username, password: data.password,
    },
  });

};

function findUser(data) {
  User.findOne({
    where: {
      username: data.username,
    },
  }).then(function (result) {
    //console.log('The user was found and the crowd goes wild');
    createAddress(data);
    return result;
  });
};

function createGabble(data, result) {
  //console.log('This is from inside the gabble function');
  Message.create({ body: data.body, userid: result.id }).then(function () {
    //console.log('The message was created');
  });
};

function createLike(result, data) {
  Like.create({ messageid: result,
    userid: data.id, }).then(function () {

      });
}

function addLikes(data) {
  Message.findOne({
    where: {
      id: data,
    },
  }).then(function (message) {
    Message.update({ total_likes: message.total_likes + 1 }, { where: { id: data } });
  });
};

function addDislikes(data) {
  Message.findOne({
    where: {
      id: data,
    },
  }).then(function (message) {
    Message.update({ total_dislikes: message.total_dislikes + 1 }, { where: { id: data } });
  });
};

//createLike(req.body, req.session);

function findAllGabbles() {
  //I need to return the user to have the username
  return Message.findAll({ include: [User], order: [['id', 'DESC']] });
};

function findAllPosts(result) { //for profile page
  return User.findOne({
    where: {
      username: result.username,
    },
  }).then(function (result) {//this passes the data to the promise
    //console.log(result);
    //console.log(result.username);
    return Message.findAll({
      include: [User],
      where: {
        userid: result.id,
      },
    });
  });
};

function findAllLikes(result) {
  return User.findOne({
    where: {
      username: result.username,
    },
  }).then(function (result) {//this passes the data to the promise
    //console.log(result);
    //console.log(result.username);
    return Like.findAll({
      include: [User, Message],
      where: {
        messageid: result.messageid,
      },

    });
  });
};

User.sync().then(function () {
  console.log('User schema is synced');
});

Address.sync().then(function () {
  console.log('Address schema is synced');
});

Phone.sync().then(function () {
  console.log('Phone schema is synced');
});

Message.sync().then(function () {
  console.log('Message schema is synced');
});

Like.sync().then(function () {
  console.log('Like schema is synced');
});

Replie.sync().then(function () {
  console.log('Replies schema is synced');
});

server.get('/signup', function (req, res) {
  if (req.body.password !== req.body.reenterPassword) {
    let error = 'Usernames must be 8 charactes long';
  }

  const states = [
    {
      value: 'AL',
      state: 'AL',
    }, {
      value: 'AK',
      state: 'AK',
    }, {
      value: 'AZ',
      state: 'AZ',
    }, {
      value: 'AR',
      state: 'AR',
    }, {
      value: 'CA',
      state: 'CA',
    }, {
      value: 'CO',
      state: 'CO',
    }, {
      value: 'CT',
      state: 'CT',
    }, {
      value: 'DE',
      state: 'DE',
    }, {
      value: 'FL',
      state: 'FL',
    }, {
      value: 'GA',
      state: 'GA',
    }, {
      value: 'HI',
      state: 'HI',
    }, {
      value: 'ID',
      state: 'ID',
    }, {
      value: 'IL',
      state: 'IL',
    }, {
      value: 'IN',
      state: 'IN',
    }, {
      value: 'CA',
      state: 'CA',
    }, {
      value: 'CA',
      state: 'CA',
    }, {
      value: 'CA',
      state: 'CA',
    }, {
      value: 'IA',
      state: 'IA',
    }, {
      value: 'KS',
      state: 'KS',
    }, {
      value: 'KY',
      state: 'KY',
    }, {
      value: 'LA',
      state: 'LA',
    }, {
      value: 'ME',
      state: 'ME',
    }, {
      value: 'MD',
      state: 'MD',
    }, {
      value: 'MA',
      state: 'MA',
    }, {
      value: 'MI',
      state: 'MI',
    }, {
      value: 'MN',
      state: 'MN',
    }, {
      value: 'MS',
      state: 'MS',
    }, {
      value: 'MO',
      state: 'MO',
    }, {
      value: 'MT',
      state: 'MT',
    }, {
      value: 'NE',
      state: 'NE',
    }, {
      value: 'NV',
      state: 'NV',
    }, {
      value: 'NH',
      state: 'NH',
    }, {
      value: 'NJ',
      state: 'NJ',
    }, {
      value: 'NM',
      state: 'NM',
    }, {
      value: 'NY',
      state: 'NY',
    }, {
      value: 'NC',
      state: 'NC',
    }, {
      value: 'ND',
      state: 'ND',
    }, {
      value: 'OH',
      state: 'OH',
    }, {
      value: 'OK',
      state: 'OK',
    }, {
      value: 'OR',
      state: 'OR',
    }, {
      value: 'PA',
      state: 'PA',
    }, {
      value: 'RI',
      state: 'RI',
    }, {
      value: 'SC',
      state: 'SC',
    }, {
      value: 'SD',
      state: 'SD',
    }, {
      value: 'TN',
      state: 'TN',
    }, {
      value: 'TX',
      state: 'TX',
    }, {
      value: 'UT',
      state: 'UT',
    }, {
      value: 'VT',
      state: 'VT',
    }, {
      value: 'VA',
      state: 'VA',
    }, {
      value: 'WA',
      state: 'WA',
    }, {
      value: 'WV',
      state: 'WV',
    }, {
      value: 'WI',
      state: 'WI',
    }, {
      value: 'WY',
      state: 'WY',
    },
  ];
  res.render('signup', { states: states });
});

server.post('/signup', function (req, res) {
  console.log('Hello from the post signup');
  createUser(req.body).then(function () {
    return createAddress(req.body);
  }).then(function () {
    res.render('login');
  });
});

server.get('/login', function (req, res) {
  res.render('login');
});

server.post('/login', function (req, res) {
  //checkUserInput(req.body);
  // console.log(checkUserInput(req.body));
  findUserId(req.body).then(function (result) {
    console.log(result);
    if (result.username === null || result.password === null) {
      res.render('login');
    }

    if (result.username !== null && result.password !== null) {
      req.session.user = result;
      res.redirect('/gabble');
    }
  });
});

server.get('/gabble', function (req, res) {
  findAllGabbles().then(function (gabbles) {
    console.log(gabbles);
      res.render('gabble', {
        gabs: gabbles,
      });
    });

  findAllLikes(req.session.user);

});

server.get('/profile', function (req, res) {
  findAllPosts(req.session.user).then(function (result) {
      //console.log(result);
      res.render('profile', {
        result: result,
      });
    });

  //console.log('Did this work');
});

server.post('/gabble', function (req, res) {
  createGabble(req.body, req.session.user);
  res.redirect('/gabble');
});

server.get('/like/', function (req, res) {
  createLike(req.query.id, req.session.user);
  addLikes(req.query.id);

  // call a function that updates the like column in the message table
  res.redirect('/gabble');
});

server.get('/dislikes/', function (req, res) {
  addDislikes(req.query.id);

  // call a function that updates the like column in the message table
  res.redirect('/gabble');
});

server.get('/logout', function (req, res) {
  req.session.destroy();
  res.render('logout');
});

server.listen(3200, function () {
  console.log('The server is now running');
});
