import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1719546838811 implements MigrationInterface {
    name = 'Migration1719546838811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "morning_start"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "morning_end"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "afternoon_start"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "afternoon_end"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "overtime_start"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "overtime_end"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "total_hours"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "entry" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "exit" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "exit"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "entry"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "total_hours" integer`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "overtime_end" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "overtime_start" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "afternoon_end" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "afternoon_start" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "morning_end" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "morning_start" TIMESTAMP`);
    }

}
