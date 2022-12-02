import { AuthenticationError } from "apollo-server-express";
import jwt, { JwtPayload } from 'jsonwebtoken'
const privateKey = process.env.PRIVATEKEY!
type Person = {
    user_id: string;
  };

export const Auth = (req: any) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        console.log("Into authHeader",authHeader)
        if (authHeader) {
            try {
                console.log("Into token try")
                const user:any = jwt.verify(authHeader, privateKey);
                console.log("User afer verification ", user)
                req.user_id = user.user_id

            } catch (e) {
                console.log("Error while verifying JWT token",e)
            }
        }
        // return next()
        console.log("Authentication token must be a Berear token")
        // throw new AuthenticationError("Authentication token must be a Berear token")
    }
    console.log("Authorization header must be provided")

    // throw new AuthenticationError("Authorization header must be provided")
}
