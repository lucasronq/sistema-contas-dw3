const db = require('../../database/database-config');

module.exports = {
    getCredencial: async (loginPar) => {
        return (
            await db.query(
                "select username, password " +
                "from usuarios where username = $1 and deleted = false",
                [loginPar]
            )
        ).rows;
    }
}