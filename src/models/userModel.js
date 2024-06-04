import db from '../db/db.js';
import cryptography from '../cryptography/cryptography.js';

async function isUserAuthorized(username) {
  const res = await db.query('SELECT EXISTS(SELECT 1 FROM users WHERE username = $1 AND is_authorized = true)', [username]);
  return res.rows[0].exists;
}

async function authorizeUser(username, password) {
  const res = await db.query('SELECT password FROM users WHERE username = $1', [username]);
  const hash = res.rows[0].password;
  const isAuthDataValid = await cryptography.compare(password, hash);

  if (isAuthDataValid) {
    await db.query('UPDATE users SET is_authorized = true WHERE username = $1', [username]);
  }
  else {
    throw new Error('The username or password was incorrect');
  }
}

async function unauthorizeUser(username) {
  await db.query('UPDATE users SET is_authorized = false WHERE username = $1', [username]);
}

async function registerUser(username, password) {
  if (!username) {
    throw new Error('The username shouldn\'t be empty!');
  }

  if (!password || password.length < 8) {
    throw new Error('Minimum password length is 8 symbols!');
  }

  const res = await db.query('SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)', [username]);
  const isUserRegistered = res.rows[0].exists;

  if (isUserRegistered) {
    throw new Error('The user with this name already exists!');
  }
  else {
    const hash = await cryptography.makeHash(password);
    await db.query('INSERT INTO users(username, password, is_authorized) VALUES ($1, $2, true)', [username, hash]);
  }
}

async function removeUser(username) {
  await db.query('DELETE FROM users WHERE username = $1', [username]);
}

export default {
  isUserAuthorized,
  authorizeUser,
  registerUser,
  removeUser,
  unauthorizeUser
};