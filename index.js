import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import mysql from "mysql2";
import morgan from "morgan";
import {dirname} from "path";
import {fileURLToPath} from "url";


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan("tiny"));

app.get("/property.html",(req,res)=>{
    res.redirect("error.ejs");
})

app.get("/error.ejs",(req,res)=>{
    res.render("error.ejs");
});

app.post("/searchome",(req,res)=>{
    console.log(req.body);
    var city = req.body["city"];
    var lawyer_type = req.body["lawyer_type"];
    // Send status code 404
    connection.connect(function (err) {
      if (err) throw err;
      connection.query(`SELECT * FROM users where city="${city}" or lawfield="${lawyer_type}"`, function (err, result, fields) {
        if (err) throw err;
        console.log(result.length);
        res.render("search.ejs", { city: city, lawyer_type: lawyer_type , result: result});
      });
    });
    
    res.status(202);
});

app.post("/search", (req, res) => {
  console.log(req.body);
  var city = req.body["city"];
  var lawyer_type = req.body["lawyer_type"];
  var fees=req.body["fees"];
  // Send status code 404
  connection.connect(function (err) {
    if (err) throw err;
    connection.query(
      `SELECT * FROM users where city="${city}" or lawfield="${lawyer_type}" or fees="${fees}"`,
      function (err, result, fields) {
        if (err) throw err;
        console.log(result.length);
        res.render("search.ejs", {
          city: city,
          lawyer_type: lawyer_type,
          result: result,
        });
      }
    );
  });

  res.status(202);
});



const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "yashdhingra",
    database: "lawhub",
});

connection.connect((err)=>{
    if (err) throw err;
    console.log("connected!");
});



app.post("/signup",(req,res)=>{
    console.log(req.body);
    connection
      .promise()
      .query(
        `INSERT INTO users VALUES ('${req.body["name"]}', '${req.body.password}', '${req.body.address}', '${req.body.pincode}','${req.body.lawfield}', '${req.body.email}','${req.body.city}','${req.body.experience}','${req.body.fees}')`
      );

    //   alert("You have successfully signed up!");
      res.redirect("/");
});
    


app.get("/document.html",(req,res)=>{
    res.redirect("error.ejs");
})

app.get("/affidavit.html",(req,res)=>{
    res.redirect("error.ejs");
})

app.get("/marriage.html",(req,res)=>{
    res.redirect("error.ejs");
})

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.listen(port, ()=>{
    console.log(`server started successfully at ${port}!`);
})
