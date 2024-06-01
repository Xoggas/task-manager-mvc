const users = [];

function isUserAuthorized(username) {
  return users.find(user => user.username === username)?.isAuthorized;
}

function authorizeUser(username, password) {
  const user = users.find(user => user.username === username);

  if (user === undefined) {
    throw new Error(`User with username ${username} doesn't exist!`);
  }

  if (user.isAuthorized) {
    return;
  }

  if (user.password === password) {
    user.isAuthorized = true;
  }
  else {
    throw new Error('Incorrect password!');
  }
}

function registerUser(username, password) {
  if (users.some(user => user.username === username)) {
    throw new Error(`User with username ${username} already exists!`);
  }

  users.push({
    username: username,
    password: password,
    isAuthorized: true
  });
}

export default {
  isUserAuthorized,
  authorizeUser,
  registerUser
};