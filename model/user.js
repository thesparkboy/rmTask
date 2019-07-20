var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// admin: 12345

var schema = new mongoose.Schema({

  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true  }

})


schema.pre("save", async function(next) {
  try {
    //salt generated
    const salt = await bcrypt.genSalt(10);

    //hashed password
    const passwordHash = await bcrypt.hash(this.password, salt);

    //assigning hashed version
    this.password = passwordHash;

    next();


  } catch (error) {
    next(error);
  }
});

schema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword,this.password);
  } catch (error) {
    throw new Error(error);
  }
};

var user = mongoose.model('user', schema);

module.exports = user;
