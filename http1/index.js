const { pool, getStats } = require("../shared/db");

module.exports = async function (context, req) {
  context.log("SingletonTest function processed a request");

  // Simulate a database query
  const result = await pool.query("SELECT * FROM test");

  // Get the stats to prove this is a singleton
  const stats = getStats();

  // Return all the data to demonstrate singleton behavior
  context.res = {
    status: 200,
    body: {
      message: "This response demonstrates the singleton pattern",
      functionInvocationId: context.invocationId,
      currentTime: new Date().toISOString(),
      poolStats: stats,
      queryResult: result.rows[0],
    },
  };
};
