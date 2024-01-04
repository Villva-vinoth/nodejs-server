const {
  create,
  getUserByUserEmail,
  getUsersDetails
} = require("./user.service");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser:(req, res) => {
    console.log("hi")
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    body.password =bcrypt.hashSync(body.password,salt);
    console.log((body.password).length)
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      if(results ==='already Exits!'){
        return res.status(409).json({
          success: 0  ,
          data: "User Already Exists"
        });
      }
      else{
        return res.status(200).json({
          success: 1  ,
          data: results
        });
      }
    });
    // });
      
  },
  login: (req, res) => {
    console.log("hi")
    const body = req.body;
    getUserByUserEmail(body.email,(err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        }); 
      }
      console.log(results)
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
     
      console.log("output",(results.password).length)

      const result = bcrypt.compareSync(body.password, results.password);
      console.log(result)
      if (result) {
        const jsontoken = sign({ email: body.email }, "vk@123", {
          expiresIn: "1h"
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  },
  getUsersDetails :(req,res) =>{
    getUsersDetails((err,result)=>{
      if(err) 
      return res.status(500).json({
    success:0,
  message:"Database Connection Error"})

  return res.status(200).json({
    success:1,
    data:result
  })

    })
  }  
};
