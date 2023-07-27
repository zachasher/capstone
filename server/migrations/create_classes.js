/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("classes", (table) => {
    table.increments("id").primary();
    table.string("class_name").notNullable();
    table.string("instructor").notNullable();
    table.string("description").notNullable();
    table.string("day").notNullable();
    table.string("time").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("classes");
};
