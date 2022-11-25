const JWT = require("jsonwebtoken")

const token = (id) => {
 return JWT.sign({id},process.env.SECRET_JWT,{
    expiresIn : "30d"
  })
}

module.exports = {token}