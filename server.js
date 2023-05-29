/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
const baseController = require("./controllers/baseController")
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const utilities = require("./utilities/")
const app = express()

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout","./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/
app.use(require("./routes/static"))
//Index route
app.get("/",utilities.handleErrors(baseController.buildHome))
//Inventory routes
app.use("/inv",require("./routes/inventoryRoute"));
/*app.get("/",function(req, res){
  res.render("index",{title: "Home"})
})*/

/***************************************
 * File Not Found Route - must be last route in list
 * Place after all routes
 * Unit 3, Basic Error Handling Activity
 ***************************************/
app.use(async(req, res, next)=>{
  next({status: 404, message: 'Sorry, we appear to have lost that page.'});
});

/* ******************************************
* Express Error Handle
* Place after all other middleware
* Unit 3, Basic Error Handling Activity
*********************************************/
app.use(async (err, req, res, next)=>{
  let nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  res.render("errors/error", {
    title: err.status || "Server Error",
    message: err.message,
    nav
  });
});




/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
