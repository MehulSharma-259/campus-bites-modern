import express from 'express';
import authRoutes from "./routes/auth.routes.js";
import contentRoutes from "./routes/content.routes.js";
import "dotenv/config";
const port = process.env.PORT || 8000;
const app = express();
app.get('/', (req, res) => {
    res.send("hello guys");
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/content', contentRoutes);
app.listen(port, () => console.log(`Server started at ${port}`));
//# sourceMappingURL=index.js.map