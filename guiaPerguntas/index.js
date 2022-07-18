const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database.js");
const Question = require("./database/Question.js");
const Response = require("./database/Response.js")


connection
.authenticate()
.then(() => {
  console.log("conexão feita com o banco de dados");
})
.catch((msgErro) => {
  console.log(msgErro);
})

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  Question.findAll({raw: true, order: [
    ["id","DESC"]
  ]}).then(questions => {
    res.render("index", {
      questions: questions
    });
  });

});

app.get("/question", (req, res) => {
  res.render("question");

});

app.get("/question/:id", (req, res)=> {
  var id = req.params.id;
  Question.findOne({
    where: { id: id }
  }).then(question => {
    if(question !== undefined){
      Response.findAll({
        where: {questionId: question.id}
      }).then(responses => {
        res.render("question",{
          question: question,
          responses: responses
        });
      })
    }else{
      res.redirect("/");
    }
  });
});

app.post("/saveQuestion", (req, res) => {
  var title = req.body.title;
  var description = req.body.description;

  Question.create({
    title: title,
    description: description
  }).then(() => {
    res.redirect("/");
  });
});

app.post("/answer", (req, res) => {
  var body = req.body.bodyResponse;
  var questionId = req.body.question;
  Response.create({
    body: body,
    questionId: questionId
  }).then(() => {
    res.redirect("/question/" + questionId);
  });
});

app.listen(8081, () => {console.log("App rodando");});