import Knex from "knex";

const knex = Knex({
  client: "pg",
  connection: "postgres://postgres:password@localhost:5432/meta_v2_2023_12_09",
  useNullAsDefault: true,
});

const runQuery = async () => {
  try {
    const rawQuery = `SELECT * from public."nc_wl1a___Features" WHERE nc_wl1a___Features.From_Date_Time >= '2023-01-01 00:00:00'::timestamp AND nc_wl1a___Features.From_Date_Time < '2023-01-07 00:00:00'::timestamp`;
    const result = await knex.raw(rawQuery);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

runQuery();
