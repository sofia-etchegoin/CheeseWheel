export async function seed(knex) {
  await knex('cheese').del()
}
