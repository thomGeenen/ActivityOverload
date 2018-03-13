/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
    
    'signup': (req,res) => {
        res.view('user/signup');
    },

    'create': (req,res) => {
        User.create(req.params.all(), (err,user) => {
            if (err) {
              sails.log(err);
              req.session.flash = { err: err }  

              return res.redirect('/user/signup');
              console.log(req.params.all());
            }
            delete user.encryptedPass;
            delete user._csrf;
            res.redirect('/user/show/'+user.id);
        });
    },

    'show': (req,res,next) => {
        User.findOne({id: req.params.id}, (err, user) => {
            if(err) return sails.log(err);
            if(!user) return sails.log(err);
            res.view('user/show', { user:user });
        });
    },

    'index': (req, res, next) => {
        User.find((err, users) => {
            if(err) return next(err);
            res.view('user/index', { users: users });
        });
    },


    'edit': (req,res,next) => {
        User.findOne({id: req.param('id')}, (err, user) => {
            if(err) return sails.log(err);
            res.view('user/edit', { user: user});
            console.log(user);
        });
    },

    'update': (req,res,next) => {
        User.update(req.param('id'), req.params.all(), (err) => {
            if(err){
                sails.log(err);
                return res.redirect('/user/edit/' + req.param('id'));
            }
            else return res.redirect('/user/show/'+ req.param('id'));
        })
    },

    'destroy': (req,res,next) => {
        User.destroy({id: req.param('id')}).exec((err) => {
            if(err) return sails.log(err);
            res.redirect('/user/index');
        });
    }
};