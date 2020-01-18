import { Context, Get, HttpResponseOK, TokenRequired, Session, Post, HttpResponseCreated, HttpResponseUnauthorized } from '@foal/core';
import { TypeORMStore, fetchUser } from '@foal/typeorm';
import { User, Subscription } from '../entities';
import { getRepository } from 'typeorm';
import moment = require('moment');

@TokenRequired({
  store: TypeORMStore,
  user: fetchUser(User),
})
export class ApiController {

  @Get('/')
  index(ctx: Context) {
    return new HttpResponseOK('Hello world!');
  }

  @Post('/subscriptions')
  async postSubscription(ctx: Context) {
    const sub = new Subscription();
    const { service, isActive, lastFour, renewal } = ctx.request.body;
    sub.service = service;
    sub.isActive = isActive;
    sub.lastFour = lastFour;
    sub.renewal = renewal;
    sub.user = ctx.user;
    const result = await getRepository(Subscription).save(sub);
    if (result) return new HttpResponseCreated()
    return new HttpResponseUnauthorized()
  }

  @Get('/subscriptions')
  async readSubcriptions(ctx: Context) {
    const subscriptions = await getRepository(Subscription).find({
      user: ctx.user
    });

    return new HttpResponseOK(subscriptions)

  }

}
