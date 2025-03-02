// This simulates a database connection module with a singleton pool

let connectionCount = 0;
let requestCount = 0;

class DbPool {
  constructor() {
    // Increment counter to prove this constructor runs only once per instance
    connectionCount++;

    // Log creation time to identify the instance
    this.createdAt = new Date().toISOString();

    // Log to console AND return in response to make verification easy
    console.log(
      `[SINGLETON TEST] DbPool instance #${connectionCount} created at ${this.createdAt}`
    );
  }

  // Method to simulate a database request
  async query(sql) {
    requestCount++;
    console.log(
      `[SINGLETON TEST] Query #${requestCount} executed on pool created at ${this.createdAt}`
    );
    return {
      rowCount: 1,
      rows: [
        {
          message: `Query executed on singleton #${connectionCount}`,
          poolCreatedAt: this.createdAt,
          totalQueriesOnThisInstance: requestCount,
        },
      ],
    };
  }

  // Return stats about this instance
  getStats() {
    return {
      instanceNumber: connectionCount,
      createdAt: this.createdAt,
      totalQueries: requestCount,
    };
  }
}

// Here's the key part - create a singleton instance at module load time
console.log("[SINGLETON TEST] db.js module loaded - about to create singleton");
const pool = new DbPool();

module.exports = {
  pool,
  getStats: () => pool.getStats(),
};
