import assert from 'assert/strict';
import test from 'node:test';
import { before, after, describe, beforeEach } from 'node:test';
import userModel from "../src/models/userModel.js"
import dotenv from 'dotenv';
import db from '../src/db/db.js';

const userName = 'test_user';
const correctPassword = '12345678';
const incorrectPassword = '1234';

before(async () => {
  dotenv.config();
  await db.connect();
});

beforeEach(async () => {
  await userModel.removeUser(userName);
});

after(async () => {
  await db.disconnect();
});

describe('User Model Tests', () => {

  describe('Authorization Tests', () => {

    test('Checks if non-existent user authorized', async () => {
      assert.strictEqual(await userModel.isUserAuthorized(userName), false);
    });

    test('Authorizes an non-existent user', async () => {
      await assert.rejects(async () => await userModel.authorizeUser(userName, correctPassword));
    });

    test('Authorizes a user with correct credentials', async () => {
      await userModel.registerUser(userName, correctPassword);

      await assert.doesNotReject(async () => await userModel.authorizeUser(userName, correctPassword));

      await userModel.removeUser(userName);
    });

    test('Authorizes a user with a wrong password', async () => {
      await userModel.registerUser(userName, correctPassword);

      await assert.rejects(async () => await userModel.authorizeUser(userName, incorrectPassword));

      await userModel.removeUser(userName);
    });

    test('Checks if a freshly registered user authorized', async () => {
      await userModel.registerUser(userName, correctPassword);

      assert.strictEqual(await userModel.isUserAuthorized(userName), true);

      await userModel.removeUser(userName);
    });

    test('Unauthorizes an existing user', async () => {
      await userModel.registerUser(userName, correctPassword);

      await assert.doesNotReject(async () => userModel.unauthorizeUser(userName));

      await userModel.removeUser(userName);
    });

    test('Unauthorizes a non-existent user', async () => {
      await userModel.unauthorizeUser(userName);
    });

  });

  describe('Registration Tests', () => {

    test('Registers a user', async () => {
      await assert.doesNotReject(async () => await userModel.registerUser(userName, correctPassword));

      await userModel.removeUser(userName);
    });

    test('Registers a user with a wrong username', async () => {
      await assert.rejects(async () => await userModel.registerUser());
    });

    test('Registers a user without a password', async () => {
      await assert.rejects(async () => await userModel.registerUser(userName));
    });

    test('Registers a user with a short password', async () => {
      await assert.rejects(async () => await userModel.registerUser(userName, '1234567'));
    });

    test('Registers an existing user', async () => {
      await userModel.registerUser(userName, correctPassword);

      await assert.rejects(async () => await userModel.registerUser(userName, correctPassword));

      await userModel.removeUser(userName);
    });

  });

  describe('User Removal Tests', () => {

    test('Removes existing user', async () => {
      await userModel.registerUser(userName, correctPassword);

      await assert.doesNotReject(async () => await userModel.removeUser(userName));
    });

    test('Removes non-existent user', async () => {
      await assert.doesNotReject(async () => await userModel.removeUser(userName));
    });

  });

});

