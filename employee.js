/* 

Victoria and Steph N. made this schema for employee sign up

Hash and salt is a method of securely storing passowrds

Nothing needs installing as crypto ships as part of Node

JWT pronouced "jot"  == Jason Web Token


npm intall jsonweboken --save must be added to package.json
*/
var jwt = require('jsonwebtoken');
var crypto = requrie('crypto');

var userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		requried: true
	},
	name: {
		type: String, 
		required: true
	},
	hash: String,
	salt: String
});

userSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};
/*
hashing and salting stuff
*/
userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "1C_UPONATIME"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

