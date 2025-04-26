import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1745694622640 implements MigrationInterface {
    name = 'AutoMigration1745694622640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "error_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying(255) NOT NULL, "method" character varying(10) NOT NULL, "status_code" integer NOT NULL, "error" character varying(255) NOT NULL, "message" text NOT NULL, "stack" text, "payload" jsonb, "headers" jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6840885d7eb78406fa7d358be72" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "error_logs"`);
    }

}
