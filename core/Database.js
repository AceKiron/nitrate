const path = require("path");

const db = require("better-sqlite3")(path.join(process.cwd(), "database.sqlite3"));

function translate_column_names(tableName, obj) {
    const result = {};
    
    for (const [fullkey, value] of Object.entries(obj)) {
        const key = fullkey.slice(tableName.length + 1);
        
        if (key == "id") result[key] = value;
        else if (key.startsWith("_")) result[key.slice(1)] = value;
        else if (key.startsWith("H_")) result[key.slice(2)] = [obj[`${tableName}_HA_${key.slice(2)}`], value, obj[`${tableName}_HS_${key.slice(2)}`]];
    }

    return result;
}

module.exports = {
    FindByRowId: (tableName, rowId) => {
        return translate_column_names(tableName, db.prepare(`SELECT * FROM ${tableName} WHERE ${tableName}_id == ${rowId} LIMIT 1`).get());
    }
};