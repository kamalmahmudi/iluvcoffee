import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitiatingDatabase1650624092241 implements MigrationInterface {
  name = 'InitiatingDatabase1650624092241'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`flavor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(32) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `CREATE TABLE \`coffee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(32) NOT NULL, \`description\` varchar(255) NULL, \`brand\` varchar(32) NOT NULL, \`recommendations\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `CREATE TABLE \`coffee_flavors_flavor\` (\`coffeeId\` int NOT NULL, \`flavorId\` int NOT NULL, INDEX \`IDX_9cb98a3799afc95cf71fdb1c4f\` (\`coffeeId\`), INDEX \`IDX_25642975c6f620d570c635f418\` (\`flavorId\`), PRIMARY KEY (\`coffeeId\`, \`flavorId\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `ALTER TABLE \`coffee_flavors_flavor\` ADD CONSTRAINT \`FK_9cb98a3799afc95cf71fdb1c4f9\` FOREIGN KEY (\`coffeeId\`) REFERENCES \`coffee\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE \`coffee_flavors_flavor\` ADD CONSTRAINT \`FK_25642975c6f620d570c635f418d\` FOREIGN KEY (\`flavorId\`) REFERENCES \`flavor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`coffee_flavors_flavor\` DROP FOREIGN KEY \`FK_25642975c6f620d570c635f418d\``
    )
    await queryRunner.query(
      `ALTER TABLE \`coffee_flavors_flavor\` DROP FOREIGN KEY \`FK_9cb98a3799afc95cf71fdb1c4f9\``
    )
    await queryRunner.query(
      `DROP INDEX \`IDX_25642975c6f620d570c635f418\` ON \`coffee_flavors_flavor\``
    )
    await queryRunner.query(
      `DROP INDEX \`IDX_9cb98a3799afc95cf71fdb1c4f\` ON \`coffee_flavors_flavor\``
    )
    await queryRunner.query(`DROP TABLE \`coffee_flavors_flavor\``)
    await queryRunner.query(`DROP TABLE \`coffee\``)
    await queryRunner.query(`DROP TABLE \`flavor\``)
  }
}
