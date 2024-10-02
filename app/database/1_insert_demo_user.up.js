module.exports = (Table) => {
    Table.insertInto("users", {
        username: "AceKiron",
        email: "demo@example.com",
        password: Table.hash("testpass")
    });
}
