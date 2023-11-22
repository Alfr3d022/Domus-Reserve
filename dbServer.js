const express = require("express")
const app = express()
const mysql = require("mysql")

const db = mysql.createPool({
   connectionLimit: 100,
   host: "26.153.51.36",
   user: "alfredogay",
   password: "123",
   database: "dbDomus",
   port: "3306"
})
db.getConnection( (err, connection)=> {
   if (err) throw (err)
   console.log ("Conexão com o banco: sucesso!! " + connection.threadId)
})
const port = "3000"
app.listen(port, ()=> console.log(`Server rodando na porta:  ${port}...`))

app.use(express.json())

app.use(express.static('src'))

app.get("/",function (req,res){
   res.sendFile(__dirname + '/src/index.html')
})

app.post("/add-registro", async (req,res) => {
const zero = 0
const user = req.body.login;
const hashedPassword = req.body.senha;
const email =  req.body.confsenha;
db.getConnection( async (err, connection) => {
 if (err) throw (err)
 const sqlSearch = "SELECT * FROM tab_users WHERE user_name = ?"
 const search_query = mysql.format(sqlSearch,[user])
 const sqlInsert = "INSERT INTO tab_users(user_name,user_pass,user_email) VALUES (?,?,?)"
 const insert_query = mysql.format(sqlInsert,[user, hashedPassword, email, zero])

 await connection.query (search_query, async (err, result) => {
  if (err) throw (err)
  console.log("------> Procurando usuários")
  console.log(result.length)
  if (result.length != 0) {
   connection.release()
   console.log("------> Usuário já existe")
   res.sendStatus(409) 
  } 
  else {
   await connection.query (insert_query, (err, result)=> {
   connection.release()
   if (err) throw (err)
   console.log ("--------> Usuário criado!!")
   console.log(result.insertId)
   res.sendStatus(201)
  })
 }
}) 
}) 
}) 