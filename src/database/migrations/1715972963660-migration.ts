import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1715972963660 implements MigrationInterface {
    name = 'Migration1715972963660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}
