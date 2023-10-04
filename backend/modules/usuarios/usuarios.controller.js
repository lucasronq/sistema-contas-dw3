const jwt = require("jsonwebtoken");
const bCrypt = require("bcryptjs");
const usuarioService = require('./usuarios.service');

module.exports = {
    login: async (req, res, next) => {
        const credencial = await usuarioService.getCredencial(req.body.username);
        if (credencial.length == 0) {
            return res.status(200).json({ message: "Usuário não identificado!" });
        }

        if (bCrypt.compareSync(req.body.password, credencial[0].password)) {
            const username = credencial[0].username;
            const token = jwt.sign({ username }, process.env.SECRET_API, {
                expiresIn: 600,
            });
            return res.json({ auth: true, token: token });
        }

        res.status(200).json({ message: "Login inválido!" });
    },

    register: async (req, res) => {
        const { username, password } = req.body;
        const passwordCriptografada = await bCrypt.hash(password, 10);
        console.log(passwordCriptografada);
        const { msg } = await usuarioService.register(username, passwordCriptografada);
        res.json({ message: msg });
    },

    autenticaJWT: async (req, res, next) => {
        const tokenHeader = req.headers["authorization"];
        if (!tokenHeader)
            return res
                .status(200)
                .json({ auth: false, message: "Não foi informado o token JWT" });

        const bearer = tokenHeader.split(" ");
        const token = bearer[1];

        jwt.verify(token, process.env.SECRET_API, function (err, decoded) {
            if (err)
                return res
                    .status(200)
                    .json({ auth: false, message: "JWT inválido ou expirado" });

            req.userId = decoded.id;
            next();
        });
    },

    logout: async (req, res, next) => {
        res.json({ auth: false, token: null });
    }
}