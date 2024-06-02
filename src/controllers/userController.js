import userModel from '../models/userModel.js';

async function checkAutorization(req, res, next) {
  if (req.path === '/users/login' || req.path === '/users/register') {
    next();
    return;
  }

  const { username } = req.cookies;
  const isAuthorized = await userModel.isUserAuthorized(username);

  if (isAuthorized) {
    next();
    return;
  }
  else {
    res.redirect('/users/login');
  }
}

async function authorizeUser(req, res) {
  const { username, password } = req.body;

  try {
    await userModel.authorizeUser(username, password);
    return res.redirect('/tasks/all');
  }
  catch (e) {
    return res.render('loginView.hbs', {
      error: e.message
    });
  }
}

async function registerUser(req, res) {
  const { username, password } = req.body;

  try {
    await userModel.registerUser(username, password);
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
};