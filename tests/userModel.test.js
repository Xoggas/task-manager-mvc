import assert from 'assert/strict';
import test from 'node:test';
import { before, after, describe } from 'node:test';
import userModel from "../src/models/userModel.js"
import dotenv from 'dotenv';
import db from '../src/db/db.js';

before(async () => {
  dotenv.config();
  await db.connect();
});

after(async () => {
  await db.disconnect();
});

describe('User Model Tests', () => {

  test('Checks if unexistent user authorized', async () => {
    assert.strictEqual(await userModel.isUserAuthorized('test_user'), false);
  });

  test('Checks if a freshly registered user authorized', async () => {
    await userModel.registerUser('test_user', 'null');

    assert.strictEqual(await userModel.isUserAuthorized('test_user'), true);

    await userModel.removeUser('test_user');
  });

  test('Tries to register an existing user', async () => {
    await userModel.registerUser('test_user', 'null');

    await assert.rejects(async () => await userModel.registerUser('test_user', 'null'));

    await userModel.removeUser('test_user');
  });

  test('Unauthorizes the unexistent user', async () => {
    await userModel.unauthorizeUser('test_user');
  });

  test('Tries to authorize an unexistent user', async () => {
    await assert.rejects(async () => await userModel.authorizeUser('test_user', 'null'));
  });

});

