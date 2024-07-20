
class UsersDbModel {
    constructor(dbConnection){
        this.dbConnection = dbConnection
    }


    isResult(result){
        if (result == null){
            return false;
        }
        if (result.length < 1){
            return false;
        }
        return true;
    }

    async getUser(email){
        const result = await this.dbConnection.sendQuery(
            "SELECT * FROM users WHERE email = $1", [email]
        );
        if (this.isResult(result)){
            return result[0];
        }
        return null;
    }


    async saveUser(email, password, firstName, lastName){
        const result = await this.dbConnection.sendQuery(
            "INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *", [email, password, firstName, lastName]
        );
        if (this.isResult(result)){
            return result[0];
        }
        return null;
    }

    async isEmailUsed(email){
        const result = await this.dbConnection.sendQuery(
            "SELECT * from users WHERE email = $1", [email]
        );
        return this.isResult(result);
    }


}

export default UsersDbModel;