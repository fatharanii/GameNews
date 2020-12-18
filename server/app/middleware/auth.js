const User = require ('../function/user')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secret = "rahasia-kita-berdua"


//==================VERIFY SIGN UP====================
exports.checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    const username = req.body.username
    const email = req.body.email
    User.getOneUserByUsername(username).then(result => {
        if (result.rows != '') {
        res.status(200).send({
          message: "Failed! Username is already in use!"
        });
        return;
      }
  
      // Email
      User.getOneUserByEmail(email).then(result => {
        if (result.rows != '') {
          res.status(200).send({
            message: "Failed! Email is already in use!"
          });
          return;
        }
  
        next();
      });
    });
};


//=======================AUTH JWT========================
exports.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
  
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
      next();
    });
};
  
exports.isAdmin = (req, res, next) => {
    User.getOneUserAdmin(req.userId).then(result => {
      var therow = JSON.stringify(result.rows)
      var panjang = therow.length
      therow = therow.substring(13, panjang-2)
      console.log(therow)
      if(therow == "true"){
        next();
        return;
      }
      
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
};
 


//=======================CONTROLLER========================
exports.signup = (req, res) => {
  // Save User to Database
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  var isAdmin = req.body.is_admin
  if(isAdmin == null){isAdmin = "false"}
  encryptpass = bcrypt.hashSync(password,8)
  User.insertUser(username, email, encryptpass, isAdmin).then(res.send({message: "registered sucessfully"}))
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  const username = req.body.username
  const password = req.body.password
  User.getOneUserByUsername(username).then(result =>{
    if(result.rows == ''){
        return res.status(200).send({ message: "User Not found." });
    }
    User.getOneUserPass(username).then(result =>{
      //mengambil isi dari "password"
      var therow = JSON.stringify(result.rows)
      var panjang = therow.length
      therow = therow.substring(14, panjang-3)
      var passwordIsValid = bcrypt.compareSync(
          password,
          therow
      );
      if (!passwordIsValid) {
            return res.status(200).send({
            accessToken: null,
            message: "Invalid Password!"
          });
      }

      User.getIDUserByUsername(username).then(result =>{
          //mengambil isi dari "userid"
          var therow = JSON.stringify(result.rows)
          var panjang = therow.length
          therow = therow.substring(12, panjang-2)
          console.log(therow)
          var token = jwt.sign({ id: therow }, secret, {
              expiresIn: 86400 // 24 hours
          });
  
          res.status(200).send({accesstoken: token});
      })
  })
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });

};
