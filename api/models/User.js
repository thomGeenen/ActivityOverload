/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    
    name: {
      type: 'string',
      required: true
    },

    title: {
      type: 'string'
    },

    email: {
      type: 'string',
      required: true,
      email: true,
      unique: true
    },

    encryptedPass: {
      type: 'string',
      required: true
    }
  },


  schema: true,

  'beforeCreate': (values ,next) => {
    if(!values.pass && values.pass != values.encryptedPass) {
      return next({ err: ["Password doesn't match the confirmation"] });
    }

    require('bcrypt').hash(values.pass, 10, (err, hashedData) => {
      if(err) return sails.log(err);
      values.encryptedPass = hashedData;
      next();
    })
  }


};

