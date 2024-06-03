import bcrypt from 'bcrypt';

const saltRounds = 10;

async function makeHash(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function compare(password, hash) {
  return await bcrypt.compare(password, hash);
}

export default {
  makeHash,
  compare
};