const app = require("express")();
const server = require("mysql2");
const parser = require("body-parser");

const con = server.createConnection({
  host: "127.0.0.1",
  database: "mydb",
  port: "3306",
  user: "root",
  password: "admin",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/", (req, res) => res.send("Welcome to Express training"));
app.get("/BookAdd", (req, res) => res.sendFile(__dirname + "/Book.html"));

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
///////////////////////////////
app.post("/bookPost", (req, res) => {
  const body = req.body;
  console.log(body);
  con.query(
    `INSERT INTO mydb.book VALUES(${body.txtId}, '${body.txtTitle}', '${body.txtAuthor}',${body.txtPrice})`,
    body,
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(`Book Added Successful`);
      }
    }
  );
});
/////////////////////////////////////

//Book Adding
app.post("/", (req, res) => {
  const body = req.body;
  con.query(
    `INSERT INTO mydb.book VALUES(${body.bkid}, '${body.bkTitle}', '${body.bkAuthor}',${body.bkPrice})`,
    body,
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

//To delete Book Record
app.delete("/:id", (req, res) => {
  let body = req.body;
  con.query(
    `DELETE FROM mydb.book WHERE bkid = ${body.bkid}`,
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(
          `Book Deleted successful that associatid with Book ID: ${body.bkid}`
        );
      }
    }
  );
});

//To get All Books
app.get("/", (req, res) => {
  con.query("SELECT * FROM mydb.book", (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.listen(1212, () => console.log("Server at 1212"));
