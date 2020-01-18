import { Context, HttpResponseOK, Post, ValidateBody, dependency, hashPassword, HttpResponseUnauthorized, verifyPassword } from '@foal/core';
import { User } from '../entities';
import { TypeORMStore } from '@foal/typeorm';
import { getRepository } from 'typeorm';

const credentialSchema = {
    additionalProperties: false,
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
    },
    required: ['email', 'password'],
    type: 'object',
};


export class AuthController {
    @dependency
    store: TypeORMStore;

    @Post('/signup')
    @ValidateBody(credentialSchema)
    async signup(ctx: Context) {
        const user = new User();


        user.email = ctx.request.body.email;
        user.password = await hashPassword(ctx.request.body.password);
        // user.password = await hashPassword(ctx.user.password);
        await getRepository(User).save(user);

        const session = await this.store.createAndSaveSessionFromUser(user);
        return new HttpResponseOK({
            token: session.getToken()
        });
    }

    @Post('/login')
    @ValidateBody(credentialSchema)
    async login(ctx: Context) {
        const user = await getRepository(User).findOne({ email: ctx.user.email });

        if (!user)
            return new HttpResponseUnauthorized();

        if (!await verifyPassword(ctx.user.password, user.password))
            return new HttpResponseUnauthorized();

        const session = await this.store.createAndSaveSessionFromUser(user);
        return new HttpResponseOK({
            token: session.getToken(),
        })
    }
}
