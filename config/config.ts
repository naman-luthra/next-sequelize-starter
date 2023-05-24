const config = {
    "development": {
      "username": "root",
      "password": process.env.DB_PASSWORD,
      "database": "Clearfeed_Starter",
      "host": "localhost",
      "port": 3306,
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": process.env.DB_PASSWORD,
      "database": "Clearfeed_Starter",
      "host": "localhost",
      "port": 3306,
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": process.env.DB_PASSWORD,
      "database": "Clearfeed_Starter",
      "host": "localhost",
      "port": 3306,
      "dialect": "mysql"
    }
  }

export default config;