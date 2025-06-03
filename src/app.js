const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const sequelize = require("./src/config/database");
const userRoutes = require("./src/routes/userRoutes");
const User = require("./src/models/User");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rotas da API
app.use("/users", userRoutes);

// Sync com banco e inicia servidor
sequelize.sync().then(() => {
    console.log("Banco sincronizado");
    app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
});
