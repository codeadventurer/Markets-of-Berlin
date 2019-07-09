const express = require('express');
const router  = express.Router();
const mongoose = require("mongoose");
const Market = require ("../models/Markets");
const hbs = require("hbs");

//Helper function to parse and display data on index
hbs.registerHelper("JSON", data => JSON.stringify(data));

/* GET home page */
// router.get('/', (req, res, next) => {
//   res.render('index');
// });

/* GET home page */
router.get("/", (req, res, next) => {
  Market.find({})
    .then(markets => {
      res.render("index", { markets });
    })
    .catch(err => {
      console.log("Error while retrieving the markets: ", err);
    });
});

const loginCheck = () => {
  return (req, res, next) => {
    if (req.session.user) next();
    else res.redirect("/login");
  };
};

router.get("/secret", loginCheck(), (req, res) => {
  res.render("secret");
});

// router.get('/markets-of-berlin', (req, res, next) => {
//   Market.find({})
//     .then(marks => {
//       res.render("test", { markets: marks });
//     })
//     .catch(error => {
//       console.log(error)
//     })
// });

// router.get('/api/markets', (req, res, next) => {
//   Place.find({}).then(markets=>{
//   res.json(markets)
//   })
// })

module.exports = router;


