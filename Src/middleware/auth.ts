import jwt  from 'jsonwebtoken'
const privateKey = process.env.PRIVATEKEY!

export const Auth = (req: any) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        if (authHeader) {
            try {
                const user:any = jwt.verify(authHeader, privateKey);
                req.user_id = user.user_id
                return user.user_id
            } catch (e) {
                console.log("Error while verifying JWT token",e)
            }
        }
        console.log("Authentication token must be a Berear token")
    }
    console.log("Authorization header must be provided")
}
