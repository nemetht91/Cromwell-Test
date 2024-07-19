import express from "express"
import bodyParser from "body-parser";
import cors from "cors";
import env from "dotenv";
import DbConnection from "./database.js";
import UsersDbModel from "./users_dbModel.js";

const app = express();
const port = 5000;

env.config();

const dbConnection = new DbConnection(
    process.env.PG_USER,
    process.env.PG_HOST,
    process.env.PG_DATABASE,
    process.env.PG_PASSWORD,
    process.env.PG_PORT,
    process.env.PG_SSL === "false"
);

const usersDbModel = new UsersDbModel(dbConnection);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/customers', async (req, res) => {
    const testUser = {
        email: "dummyeamil@gmail.com",
        firstName: "John",
        lastName: "Smith",
        password: "passwod"
    }
    const saved_user = await usersDbModel.saveUser(testUser.email, testUser.firstName, testUser.lastName, testUser.password);
    if(saved_user == null){
        res.json({});
    }
    res.json(saved_user);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  