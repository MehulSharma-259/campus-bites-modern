import { verifyTokenUser } from "../utils/jwt.js";
import prisma from "../lib/prisma.js";
export async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
            message: "unauthorized: no token provided"
        });
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({
            message: "unauthorized"
        });
        return;
    }
    try {
        const payload = verifyTokenUser(token);
        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: { id: true, email: true, universityId: true }
        });
        if (!user) {
            res.status(401).json({ message: "unauthorized: user not found" });
            return;
        }
        req.user = user;
        next();
    }
    catch (err) {
        if (err && err.name == "TokenExpiredError") {
            res.status(401).json({
                message: "unauthorized: token expired"
            });
        }
        res.status(403).json({
            message: "invalid token"
        });
        return;
    }
}
//# sourceMappingURL=auth.js.map