const User = require("../models/User");

module.exports = {
    async index(req, res) {
        const users = await User.findAll();
        res.json(users);
    },

    async show(req, res) {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
        res.json(user);
    },

    async store(req, res) {
        const { name, email } = req.body;
        try {
            const user = await User.create({ name, email });
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { name, email } = req.body;
        try {
            const user = await User.findByPk(id);
            if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

            await user.update({ name, email });
            res.json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async destroy(req, res) {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

        await user.destroy();
        res.status(204).end();
    },
};