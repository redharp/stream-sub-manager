import {MigrationInterface, QueryRunner} from "typeorm";

export class addSubscriptionUserRelation1579303347035 implements MigrationInterface {
    name = 'addSubscriptionUserRelation1579303347035'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "temporary_subscription" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "service" varchar NOT NULL, "lastFour" varchar NOT NULL, "isActive" boolean NOT NULL, "renewal" date NOT NULL, "user_id" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_subscription"("id", "service", "lastFour", "isActive", "renewal") SELECT "id", "service", "lastFour", "isActive", "renewal" FROM "subscription"`, undefined);
        await queryRunner.query(`DROP TABLE "subscription"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_subscription" RENAME TO "subscription"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_subscription" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "service" varchar NOT NULL, "lastFour" varchar NOT NULL, "isActive" boolean NOT NULL, "renewal" date NOT NULL, "user_id" integer, CONSTRAINT "FK_940d49a105d50bbd616be540013" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_subscription"("id", "service", "lastFour", "isActive", "renewal", "user_id") SELECT "id", "service", "lastFour", "isActive", "renewal", "user_id" FROM "subscription"`, undefined);
        await queryRunner.query(`DROP TABLE "subscription"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_subscription" RENAME TO "subscription"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subscription" RENAME TO "temporary_subscription"`, undefined);
        await queryRunner.query(`CREATE TABLE "subscription" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "service" varchar NOT NULL, "lastFour" varchar NOT NULL, "isActive" boolean NOT NULL, "renewal" date NOT NULL, "user_id" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "subscription"("id", "service", "lastFour", "isActive", "renewal", "user_id") SELECT "id", "service", "lastFour", "isActive", "renewal", "user_id" FROM "temporary_subscription"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_subscription"`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription" RENAME TO "temporary_subscription"`, undefined);
        await queryRunner.query(`CREATE TABLE "subscription" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "service" varchar NOT NULL, "lastFour" varchar NOT NULL, "isActive" boolean NOT NULL, "renewal" date NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "subscription"("id", "service", "lastFour", "isActive", "renewal") SELECT "id", "service", "lastFour", "isActive", "renewal" FROM "temporary_subscription"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_subscription"`, undefined);
    }

}
