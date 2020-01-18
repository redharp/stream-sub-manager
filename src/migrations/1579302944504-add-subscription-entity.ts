import {MigrationInterface, QueryRunner} from "typeorm";

export class addSubscriptionEntity1579302944504 implements MigrationInterface {
    name = 'addSubscriptionEntity1579302944504'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "subscription" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "service" varchar NOT NULL, "lastFour" varchar NOT NULL, "isActive" boolean NOT NULL, "renewal" date NOT NULL)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "subscription"`, undefined);
    }

}
