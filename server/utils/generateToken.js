import jwt from "jsonwebtoken";

// user generatindg token
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

export default generateToken