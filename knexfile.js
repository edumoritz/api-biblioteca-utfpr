const { connection } = require('./.env') 

module.exports = {
    development: {
      client: 'mysql',
      connection,
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        directory: './src/database/migrations'
      },
      useNullAsDefault: true,
    },
  
    test: {
      client: 'sqlite3',
      connection: {
        filename: './src/database/test.sqlite'
      },
      migrations: {
        directory: './src/database/migrations'
      },
      useNullAsDefault: true,
    },
  
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: __dirname + '/src/database/migrations'
      }
    }
  
  };