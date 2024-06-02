import bcrypt from 'bcrypt';

const saltRounds = 10;

async function createPasswordHash(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function comparePasswordWithHash(password, hash) {
  return await bcrypt.compare(password, hash);
}

export default {
  makeHash: createPasswordHash,
  compare: comparePasswordWithHash
}