import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717803983712 implements MigrationInterface {
    name = 'Migration1717803983712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "morning_start"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "morning_end"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "afternoon_start"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "afternoon_end"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "overtime_start"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "overtime_end"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "total_hours"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "timeCardId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "morningStart" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "morningEnd" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "afternoonStart" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "afternoonEnd" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "overtimeStart" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "overtimeEnd" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "totalHours" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "totalHours"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "overtimeEnd"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "overtimeStart"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "afternoonEnd"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "afternoonStart"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "morningEnd"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "morningStart"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" DROP COLUMN "timeCardId"`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "total_hours" integer`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "overtime_end" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "overtime_start" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "afternoon_end" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "afternoon_start" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "morning_end" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "time_card_entries" ADD "morning_start" TIMESTAMP`);
    }

}
