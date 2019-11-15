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
  .get('/postage', function(req, res){
    var weight = Number(req.query.weight);
    var c = Number(req.query.class);
    var result = calculateRate(weight, c);
    result = precise(result);
    console.log(result);
    res.render("pages/results", {
      result: result
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function calculateRate(weight, c) {
  console.log(c);
  var rate = 0.0;
  switch (c) {
    case 1:
      if (weight <= 3.5) {
        rate = stamped(weight);
      }
      if (weight > 3.5) {
        rate = flats(weight);
      }
      break;
    case 2:
      if (weight <= 3.5) {
        rate = metered(weight);
      }
      if (weight > 3.5) {
        rate = flats(weight);
      }
      break;
    case 3:
      if (weight <= 13) {
        rate = flats(weight);
      }
      if (weight > 13) {
        rate = parcels(weight);
      }
      break;
    case 4:
      rate = parcels(weight);
      break;
    default:

  }
  console.log(rate);
  return rate;
}

function stamped(weight){
  var num = 0.0;
  if (weight <= 1) {
    num = 0.55;
  }
  if ((weight <= 2) && (weight > 1)) {
    num = 0.70;
  }
  if ((weight <= 3) && (weight > 2)) {
    num = 0.85;
  }
  if ((weight > 3)) {
    num = 1.00;
  }
  return num;
}

function metered(weight) {
  var num = 0.0;
  if (weight <= 1) {
    num = 0.50;
  }
  if ((weight <= 2) && (weight > 1)) {
    num = 0.65;
  }
  if ((weight <= 3) && (weight > 2)) {
    num = 0.80;
  }
  if ((weight > 3)) {
    num = 0.95;
  }
  return num;
}

function flats(weight){
  var num = 0.0;
  if (weight <= 1) {
    num = 1.00;
  }
  if ((weight <= 2) && (weight > 1)) {
    num = 1.15;
  }
  if ((weight <= 3) && (weight > 2)) {
    num = 1.30;
  }
  if ((weight <= 4) && (weight > 3)) {
    num = 1.45;
  }
  if ((weight <= 5) && (weight > 4)) {
    num = 1.60;
  }
  if ((weight <= 6) && (weight > 5)) {
    num = 1.75;
  }
  if ((weight <= 7) && (weight > 6)) {
    num = 1.90;
  }
  if ((weight <= 8) && (weight > 7)) {
    num = 2.05;
  }
  if ((weight <= 9) && (weight > 8)) {
    num = 2.20;
  }
  if ((weight <= 10) && (weight > 9)) {
    num = 2.35;
  }
  if ((weight <= 11) && (weight > 10)) {
    num = 2.50;
  }
  if ((weight <= 12) && (weight > 11)) {
    num = 2.65;
  }
  if ((weight <= 13) && (weight > 12)) {
    num = 2.80;
  }
  return num;
}

function parcels(weight){
  var num = 0.0;
  if (weight <= 4) {
    num = 3.66;
  }
  if ((weight <= 8) && (weight > 4)) {
    num = 4.39;
  }
  if ((weight <= 12) && (weight > 8)) {
    num = 5.19;
  }
  if ((weight <= 13) && (weight > 12)) {
    num = 5.71;
  }
  return num;
}

function precise(x) {
  return Number.parseFloat(x).toPrecision(2);
}
