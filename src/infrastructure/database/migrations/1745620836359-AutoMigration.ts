import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1745620836359 implements MigrationInterface {
    name = 'AutoMigration1745620836359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "producers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tax_id" character varying NOT NULL, "tax_id_hash" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_ef888bf12ee973cf5df328bcbca" UNIQUE ("tax_id_hash"), CONSTRAINT "PK_7f16886d1a44ed0974232b82506" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "properties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "total_area" integer NOT NULL, "arable_area" integer NOT NULL, "vegetation_area" integer NOT NULL, "producer_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "harvests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "year" integer NOT NULL, "property_id" uuid NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_fb748ae28bc0000875b1949a0a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "crops" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "seed" character varying NOT NULL, "harvest_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_098dbeb7c803dc7c08a7f02b805" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_69f6c79c4f49c1bb12a473bdd16" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "harvests" ADD CONSTRAINT "FK_b9dfcfb6efb97bafbbe1fc84d9f" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "crops" ADD CONSTRAINT "FK_33def18beba78449f5f4e99aa2f" FOREIGN KEY ("harvest_id") REFERENCES "harvests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crops" DROP CONSTRAINT "FK_33def18beba78449f5f4e99aa2f"`);
        await queryRunner.query(`ALTER TABLE "harvests" DROP CONSTRAINT "FK_b9dfcfb6efb97bafbbe1fc84d9f"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_69f6c79c4f49c1bb12a473bdd16"`);
        await queryRunner.query(`DROP TABLE "crops"`);
        await queryRunner.query(`DROP TABLE "harvests"`);
        await queryRunner.query(`DROP TABLE "properties"`);
        await queryRunner.query(`DROP TABLE "producers"`);
    }

}
