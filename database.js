import pg from "pg";


class DbConnection{
  constructor(dbUser, dbHost, dbName, dbPassword, dbPort, isSsl){
    this.dbUser = dbUser,
    this.dbHost = dbHost,
    this.dbName = dbName,
    this.dbPassword = dbPassword,
    this.dbPort = dbPort,
    this.isSsl = isSsl
  }

  async createNewConnection(){
    const db = new pg.Client({
      user: this.dbUser,
      host: this.dbHost,
      database: this.dbName,
      password: this.dbPassword,
      port: this.dbPort,
      ssl: this.isSsl,
    });
    try{
      await db.connect();
      return db;
    }
    catch(err){
      console.error("Error while connecting to db. Check db connection parameters!", err.stack)
    }
    
  }

  async sendQuery(queryString, parameters){
    var db = await this.createNewConnection();
    if(db == null){
      throw new Error("Db Connection Error!")
    }
    var data = null;
    try{
      var result = await db.query(queryString, parameters);
      data = result.rows;
    }
    catch(err){
      console.error("Error executing query", err.stack);
      return null;
    }
    finally{
      await db.end();
    }
  
    return data;
  }

}

export default DbConnection;








