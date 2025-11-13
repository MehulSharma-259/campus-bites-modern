import jwt from "jsonwebtoken"
const jwt_secret_user = process.env.JWT_SECRET_USER as string;
const jwt_secret_admin = process.env.JWT_SECRET_ADMIN as string;

if(!jwt_secret_user || !jwt_secret_admin) {
  throw new Error("JWT_SECRET is not available in .env file")
}

interface IPayload {
  userId: string
}

export function signTokenUser(payload: IPayload) {
  const token = jwt.sign(payload, jwt_secret_user, {
    expiresIn: "7d"
  })

  return token;
}

export function signTokenAdmin(payload: IPayload) {
  const token = jwt.sign(payload, jwt_secret_admin, {
    expiresIn: "7d"
  })

  return token;
}

export function verifyTokenUser(token: string) {
  const data = jwt.verify(token, jwt_secret_user)
  return data;
}

export function verifyTokenAdmin(token: string) {
  const data = jwt.verify(token, jwt_secret_admin)
  return data;
}