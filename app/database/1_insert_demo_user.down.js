module.exports = (Table) => {
    Table.deleteWhere(
        "users",
        (table) => table.equals(
            table.column("username"),
            table.string("AceKiron")
        )
    );
}
