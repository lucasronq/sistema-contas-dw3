const contasService = require('./contas.service');

module.exports = {
    getAllContas: async (req, res) => {
        const result = await contasService.getAllContas();
        res.json({ status: 'ok', result });
    },

    getContaById: async (req, res) => {
        const { id } = req.params;
        const result = await contasService.getContaById(id);
        res.json({ status: 'ok', result });
    },

    insertConta: async (req, res) => {
        const { data } = req.body;
        const { msg } = await contasService.insertConta(data);
        res.json({ status: msg });
    },

    updateContaById: async (req, res) => {
        const { id, data } = req.body;
        const { msg } = await contasService.updateContaById(id, data);
        res.json({ status: msg });
    },

    deleteContaById: async (req, res) => {
        const { id } = req.body;
        const { msg } = await contasService.deleteContaById(id);
        res.json({ status: msg });
    }
}