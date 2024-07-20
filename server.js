import express from "express"
import bodyParser from "body-parser";
import cors from "cors";
import env from "dotenv";
import bcrypt from "bcrypt";
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
const saltRounds = 10;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/user', async(req, res) => {
    const email = req.query.email;

    try {
        const user = await usersDbModel.getUser(email);
        if(user == null){
            res.status(404).json({
                message: "User not found"
            })
        }else{
            res.status(200).json(
                {
                    firstName: user.first_name,
                    lastName: user.last_name,
                    email: user.email
                }
            );
        }
    } catch (error) {
        res.status(500).json({});
    }
    
})

app.post('/user/register', async(req, res) => {
    const email = req.query.email;
    const password = await hashPassword(req.query.password);
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;

    try {
        if(await usersDbModel.isEmailUsed(email)){
            res.status(409).json(
                {
                    message: "Email already used"
                }
            )
            return;
        }
    } catch (error) {
        res.status(500).json({});
        return;
    }
    

    if(password == null){
        res.status(400).json(
            {
                message: "Password hashing error"
            }
        )
        return;
    }

    try {
        const saved_user = await usersDbModel.saveUser(email,  password, firstName, lastName);
        if(saved_user == null){
            res.status(400).json({
                message: "Failed to save user"
            });
            return;
        }
        
        res.status(200).json(
                {
                    firstName: saved_user.first_name,
                    lastName: saved_user.last_name,
                    email: saved_user.email
                }
            );
    } catch (error) {
        res.status(500).json({});
    }

    
})

app.post('/user/login', async(req, res) => {
    const email = req.query.email;
    const password = req.query.password;

    try {
        const user = await usersDbModel.getUser(email);
    
        if(user == null){
            res.status(404).json(
                {
                    message: "Invalid eamil"
                }
            )
            return;
        }

        if(await isPasswordValid(user.password, password)){
            res.status(200).json(
                {
                    firstName: user.first_name,
                    lastName: user.last_name,
                    email: user.email
                }
            )
            return;
        }

        res.status(404).json(
            {
                message: "Incorrect password"
            }
    )
    } catch (error) {
        res.status(500).json({});
    }
})


async function hashPassword(password){
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.log("Error during hashing:", error);
      return null;
    }
  }

  async function isPasswordValid(storedPassword, password){
    try {
      var result = await bcrypt.compare(password, storedPassword);
      return result;
    } catch (error) {
      console.log("Incorrect password!");
      return false;    
    }
    
  }

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  