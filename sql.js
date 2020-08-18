const GET_EFFECTIVENESS_CHART = `SELECT att.name, def.name, damage_factor FROM type_efficacy
    JOIN (SELECT * FROM type_names WHERE local_language_id = 9)
        AS att ON type_efficacy.damage_type_id = att.type_id
    JOIN (SELECT * FROM type_names WHERE local_language_id = 9)
        AS def ON type_efficacy.target_type_id = def.type_id
    ;`;

module.exports = {
  GET_EFFECTIVENESS_CHART,
};
