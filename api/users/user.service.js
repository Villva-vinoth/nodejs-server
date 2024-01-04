const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    try{
      pool.query(`select email from users where email=?`,[data.email],(err,result)=>{
        if(err) callBack(err)
        if(result.length === 0){
          pool.query(
            `insert into users(firstname, lastname, email, password, mobilenumber) 
                      values(?,?,?,?,?)`,
            [
              data.firstname,
              data.lastname,
              data.email,
              data.password,
              data.mobilenumber
            ],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
          );      
        }
        else{
          return callBack(null,"already Exits!");
        }
      })

    }
    catch(err){
      return callBack(err);
    }
    
  },
  getUserByUserEmail: (email, callBack) => {
    try{
      pool.query(
        `select * from users where email = ?`,
        [email],
        (error, results) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results[0]);
        }
      );
    }
    catch(err){
      return callBack(err);
    }
    
  },
  getUsersDetails :(callBack)=>{

    try{
      pool.query(`select * from users`,(err,result)=>{
        if(err) return callBack(err);
        return callBack(null,result);
      })
    }
    catch(err){
      return callBack(err);
    } 
  } 
};
