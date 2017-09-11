const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const db = new Sequelize('gabble', '', '', {
  host: 'localhost',
  dialect: 'postgres'
});


const User = db.define('user', {
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  first_name: {
    type: Sequelize.STRING,
  },
  last_name: {
    type: Sequelize.STRING,
  },
});
const Address = db.define('address',{
  id: {
  type: Sequelize.INTEGER,
  primaryKey: true,
  autoIncrement:true,
},
address1: {
  type: Sequelize.STRING,
},
address2: {
  type: Sequelize.STRING,
},
city: {
  type: Sequelize.STRING,
},
  state: {
  type: Sequelize.STRING,
},
zipcode: {
  type: Sequelize.INTEGER,
},
});
const Phone = db.define('phone',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true,
},
mobile: {
  type: Sequelize.STRING,
},
});
const Message = db.define('message',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true,
},
body: {
  type: Sequelize.STRING(140),
},
});
const Like = db.define('like',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true,
},
});
const Replie = db.define('replie',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true,
},
  body: {
    type: Sequelize.STRING(140),
},
});



Address.belongsTo(User, {foreignKey: 'userid'});
Phone.belongsTo(User, {foreignKey: 'userid'});
Message.belongsTo(User, {foreignKey: 'userid'});
Like.belongsTo(Message, {foreignKey: 'messageid'});
Like.belongsTo(User, {foreignKey: 'userid'});
Replie. belongsTo(User, {foreignKey: 'userid'});
Replie. belongsTo(Message, {foreignKey: 'messageid'});
module.exports = {User: User, Address: Address,Phone: Phone,
Message: Message, Like: Like, Replie: Replie};
