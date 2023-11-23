const express = require("express");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
   connectionLimit: 100,
   host: "26.153.51.36",
   user: "alfredogay",
   password: "123",
   database: "dbDomus",
   port: "3306",
});



app.post("/registro", async (req, res) => {
   const user = req.body.name;
   const hashedPassword = req.body.password
   const email = req.body.email;
   db.getConnection(async (err, connection) => {
      if (err) throw (err)
      const sqlSearch = "SELECT * FROM tab_users WHERE user_name = ? or user_email = ?"
      const search_query = mysql.format(sqlSearch, [user,email])
      const sqlInsert = "INSERT INTO tab_users(user_name,user_pass,user_email) VALUES (?,?,?)"
      const insert_query = mysql.format(sqlInsert, [user, hashedPassword, email])

      await connection.query(search_query, async (err, result) => {
         if (err) throw (err)
         console.log("------> Procurando usuários")
         console.log(result.length)
         if (result.length != 0) {
            connection.release()
            console.log("------> Usuário já existe")
            res.sendStatus(409)
         }
         else {
            await connection.query(insert_query, (err, result) => {
               connection.release()
               if (err) throw (err)
               console.log("--------> Usuário criado!!")
               console.log(result.insertId)
               res.sendStatus(201)
            })
         }
      })
   })
})


app.post("/login", async (req, res) => {
   const email = req.body.email;
   const senha = req.body.senha;

   db.getConnection(async (err, connection) => {
      if (err) throw (err)
      const sqlSearch = "SELECT * FROM tab_users WHERE user_email = ?"
      const search_query = mysql.format(sqlSearch, [email])

      await connection.query(search_query, async (err, result) => {
         if (err) throw (err)
         console.log("------> Procurando usuários")
         console.log(result.length)

         if (result.length === 0) {
            connection.release();
            console.log("------> Usuário não existe");
            return res.sendStatus(401);
         }

         const storedHashedPassword = result[0].user_pass;

         if (senha != storedHashedPassword) {
            connection.release();
            console.log("------> Senha incorreta");
            return res.sendStatus(401);
         }

         connection.release();
         console.log("------> Login bem-sucedido");
         res.sendStatus(200);
      })
   })
})

const port = 3000;
app.listen(port, () => console.log(`Servidor rodando na porta: ${port}...`));
