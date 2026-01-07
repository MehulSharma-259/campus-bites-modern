import jwt from "jsonwebtoken";
const jwt_secret_user = process.env.JWT_SECRET_USER;
const jwt_secret_admin = process.env.JWT_SECRET_ADMIN;
if (!jwt_secret_user || !jwt_secret_admin) {
    throw new Error("JWT_SECRET is not available in .env file");
}
export function signTokenUser(payload) {
    const token = jwt.sign(payload, jwt_secret_user, {
        expiresIn: "7d"
    });
    return token;
}
export function signTokenAdmin(payload) {
    const token = jwt.sign(payload, jwt_secret_admin, {
        expiresIn: "7d"
    });
    return token;
}
export function verifyTokenUser(token) {
    const data = jwt.verify(token, jwt_secret_user);
    return data;
}
export function verifyTokenAdmin(token) {
    const data = jwt.verify(token, jwt_secret_admin);
    return data;
}
//# sourceMappingURL=jwt.js.map