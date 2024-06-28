import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1719584699369 implements MigrationInterface {
    name = 'Migration1719584699369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('trabajador', 'administrador')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "jwt" character varying(255), "refreshToken" character varying(255), "name" character varying(255), "lastName" character varying(25), "userName" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'trabajador', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "time_cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "periodStart" TIMESTAMP NOT NULL, "periodEnd" TIMESTAMP NOT NULL, "user_id" integer, CONSTRAINT "PK_214854fa608e8766038ade7664b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "time_card_entries" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "entry" TIMESTAMP, "exit" TIMESTAMP, "time_card_id" uuid, CONSTRAINT "PK_0c6f38c61a55010ea77f200a1fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "time_cards" ADD CONSTRAINT "FK_46b927c2d7254d51c5287dbc187" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD CONSTRAINT "FK_dc1dfe9fddd519ca2810ce6da4b" FOREIGN KEY ("time_card_id") REFERENCES "time_cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP CONSTRAINT "FK_dc1dfe9fddd519ca2810ce6da4b"`);
        await queryRunner.query(`ALTER TABLE "time_cards" DROP CONSTRAINT "FK_46b927c2d7254d51c5287dbc187"`);
        await queryRunner.query(`DROP TABLE "time_card_entries"`);
        await queryRunner.query(`DROP TABLE "time_cards"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
