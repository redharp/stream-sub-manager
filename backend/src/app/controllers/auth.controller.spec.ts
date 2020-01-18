// std
import { ok, strictEqual } from 'assert';

// 3p
import { Context, createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { AuthController } from './auth.controller';
import { User } from '../entities';
import { Connection, createConnection } from 'typeorm';

describe('AuthController', () => {

  let controller: AuthController;
  let connection: Connection;

  before(async () => { connection = await createConnection() });
  after(() => connection.close());
  beforeEach(() => controller = createController(AuthController));

  describe('has a "signup" method that', () => {

    it('should handle requests at POST /signup.', () => {
      strictEqual(getHttpMethod(AuthController, 'signup'), 'POST');
      strictEqual(getPath(AuthController, 'signup'), '/signup');

    });

    it('should return an HttpResponseOK.', async () => {
      const ctx = new Context({});
      const user = new User();
      user.email = 'test@email.com';
      user.password = 'password';
      ctx.user = user;
      const response = await controller.signup(ctx);

      ok(isHttpResponseOK(response));
      ok(response.body.token)
    });

  });

  describe('has a "login" method that', () => {

    it('should handle requests at POST /login.', () => {
      strictEqual(getHttpMethod(AuthController, 'login'), 'POST');
      strictEqual(getPath(AuthController, 'login'), '/login');

    });

    it('should return an HttpResponseOK.', async () => {
      const ctx = new Context({});
      const user = new User();
      user.email = 'test@email.com';
      user.password = 'password';
      ctx.user = user;
      const response = await controller.login(ctx);

      ok(isHttpResponseOK(response));
      ok(response.body.token)
    });

  });

});
