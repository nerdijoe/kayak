const db = require('../models');

exports.getUsers = (req, res) => {
  db.User.findAll()
    .then((users) => {
      console.log('getUsers =', users);
      res.json(users);
    }).catch((err) => {
      console.log(err);
    });
};

exports.getOneUser = (req, res) => {
  const id = req.params.id;
  db.User.findOne({
    where: {
      id,
    },
  }).then((user) => {
    if(!user) {
      res.json({ message: 'Invalid user id' });
    } else {
      res.json(user);
    }
  }).catch((err) => {
    console.log(err);
  });
};

exports.editUser = (req, res) => {
  const id = req.params.id;
  db.User.update(req.body, {
    where: {
      id,
    },
  }).then((status) => {
    console.log('after edit user, status=', status)
    res.json(status);
  });
};
