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

/**
 * @param {string} type1
 * @param {string=} type2
 */
function getTypeWeaknesses(type1, type2) {
  const QUERY = `SELECT damage_factor as damagePercentage, defender.name AS type
                 FROM type_efficacy
                 JOIN (SELECT * FROM type_names WHERE local_language_id = 9)
                     AS defender ON type_efficacy.target_type_id = defender.type_id
                 JOIN (SELECT * FROM type_names WHERE local_language_id = 9)
                     AS attacker ON type_efficacy.damage_type_id = attacker.type_id
                 WHERE attacker.name = ?;
  `;
  return new Promise((resolve, reject) => {
    database.all(QUERY, [type1], (err, rows) => {
      if (err) return reject(err);

      let efficacy = {};
      for (const { damagePercentage, type } of rows) {
        efficacy[type] = damagePercentage;
      }

      return resolve(efficacy);
    });
  });
}

module.exports = {
  getTypechart,
  getTypeWeaknesses,
};
