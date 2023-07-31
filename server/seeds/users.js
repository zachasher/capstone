/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      first_name: "Zach",
      last_name: "Asher",
      email: "zach.asher@hotmail.co.uk",
      password: "admin123",
      type: "admin",
    },
  ]);
};
