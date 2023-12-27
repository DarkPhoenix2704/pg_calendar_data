import Knex from 'knex';


const knex = Knex({
  client: "pg",
  connection: 'postgres://postgres:password@localhost:5432/meta_v2_2023_12_09',
  useNullAsDefault: true,
});

const runRawQuery = async () => {
  try {
    // Example raw query
    /* const result = await knex
      .from("nc_calender_view_v2")
      .update({
        fk_view_id: "vwyz12ah4w5l2ejk",
      })
      .where({
        source_id: "b88wr4ckxix8uus",
      });
 */

      /* const result = await knex.from("nc_calender_view_columns_v2").insert({
        id: "ncr1rxfv2caahjkq0",
        fk_view_id: "vwyz12ah4w5l2ejk",
        fk_column_id: "cgo1j794nmu3l3i",
        source_id: "b88wr4ckxix8uus",
        base_id: "ppxfyshf4zd0uqr",
        show: true,
        order_num: 2,
      }); */
      const result = await knex
        .from("nc_calender_view_date_column_v2")
        .insert({
          id: "ncr1rxfv2caahj89",
          fk_view_id: "vwyz12ah4w5l2ejk",
          fk_col_date_from_id: "c0q1jmip403y3k5",
          label: 'Event'
        });

  
    console.log('Raw query result:', result);
  } catch (error) {
    console.error('Error executing raw query:', error);
  } finally {
    await knex.destroy();
  }
};

runRawQuery();
