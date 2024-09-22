module.exports = (Table) => {
    Tables.createIfNotExists("users", function(table) {
        table.id();
        
        table.string("username").unique();
        table.string("email").unique();
    
        table.timestamp("email_verified_at").nullable();
        
        table.hash("password", "password_salt");
    
        table.timestamps();
    });
}
