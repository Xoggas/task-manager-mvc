import db from '../db/db.js';
import cryptography from '../cryptography/cryptography.js';

async function isUserAuthorized(username) {
  const res = await db.query('SELECT is_authorized FROM users WHERE username = $1', [username]);
  const isAuthorized = res.rows[0].is_authorized || false;
  return isAuthorized;
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

async function registerUser(username, password) {
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

export default {
  isUserAuthorized,
  authorizeUser,
  registerUser
};