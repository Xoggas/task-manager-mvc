import userModel from '../models/userModel.js';

function checkAutorization(req, res, next) {
  const { username } = req.cookies;
  const isAuthorized = userModel.isUserAuthorized(username);

  if (isAuthorized) {
    next();
    return;
  }

  console.log(req.path);

  if (req.path === '/users/login' || req.path === '/users/register') {
    next();
  }
  else {
    res.redirect('/users/login');
  }
}

function authorizeUser(req, res) {
  const { username, password } = req.body;

  try {
    userModel.authorizeUser(username, password);
    return res.redirect('/tasks/all');
  }
  catch (e) {
    return res.render('loginView.hbs', {
      error: e.message
    });
  }
}

function registerUser(req, res) {
  const { username, password } = req.body;

  try {
    userModel.registerUser(username, password);
    return res.redirect('/tasks/all');
  }
  catch (e) {
    return res.render('registerView.hbs', {
      error: e.message
    });
  }
}

export default {
  checkAutorization,
  authorizeUser,
  registerUser
}