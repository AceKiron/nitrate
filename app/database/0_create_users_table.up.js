module.exports = (Table) => {
    Table.createIfNotExists("users", function(table) {
        table.id();
        
        table.string("username", table.mods.unique);
        table.string("email", table.mods.unique);

        table.timestamp("email_verified_at", table.mods.nullable);

        table.hash("password", "password_salt");

        table.timestamps();
    });
}
