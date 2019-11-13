const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/math', function(req, res){
    console.log("Function called!");
    let op1 = Number(req.query.op1)
    let op2 = Number(req.query.op2)
    console.log(op1);
    console.log(op2);
    var operator = req.query.operator
    console.log(operator);
    var result = 0;
    switch (operator) {
      case "+":
        console.log("Addition!");
        result = op1 + op2;
        break;
      case "-":
        console.log("Subtraction!");
        result = op1 - op2;
        break;
      case "/":
        console.log("Division!");
        result = op1 / op2;
        break;
      case "*":
        console.log("Multiplication!");
        result = op1 * op2;
        break;
      default:
        console.log("Broken!");
        break;
    }
    console.log(result);
    res.render("pages/results", {
      result: result
    })
  })
  .get('/postage', function(req, res){
    var weight = Number(req.query.weight);
    var c = Number(req.query.class);
    var result = calculateRate(weight, c);
    console.log(weight);
    console.log(c);
    console.log(result);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function calculateRate(weight, c) {
  return 9000;
}
