const sqlite3 = require("sqlite3");
const database = new sqlite3.Database("./data/pokedex.sqlite");

function getTypechart() {
  const QUERY = `SELECT att.name as attacking, def.name as target, damage_factor as damagePercentage
    FROM type_efficacy
    JOIN (SELECT * FROM type_names WHERE local_language_id = 9)
      AS att ON type_efficacy.damage_type_id = att.type_id
    JOIN (SELECT * FROM type_names WHERE local_language_id = 9)
      AS def ON type_efficacy.target_type_id = def.type_id
    ;`;

  return new Promise((resolve, reject) => {
    database.all(QUERY, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

module.exports = {
  getTypechart,
};
