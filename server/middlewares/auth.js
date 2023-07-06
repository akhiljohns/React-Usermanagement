import jwt from 'jsonwebtoken'

export const auth = async (req, res, next) => {
    const token =await req.cookies.token;
    const key = 'secure_key'


    if (token) {
        jwt.verify(token, key, (err, decode) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: 'tocken verification failed'
                })
            } else {
                next()
            }
        })

    } else {
        res.status(401).json({
            success: false,
            message: 'tocken not found'
        })
    }
}
export default auth






