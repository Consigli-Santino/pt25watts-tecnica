const sequelize = require('../config/database');

const Usuario = require('./Usuario')(sequelize);
const Rol = require('./Rol')(sequelize);
const Canje = require('./Canje')(sequelize);
const Cupon = require('./Cupon')(sequelize);
const EstadoCupon = require('./EstadoCupon')(sequelize);

Usuario.belongsTo(Rol, {
    foreignKey: 'id_rol',
    as: 'rol'
});

Rol.hasMany(Usuario, {
    foreignKey: 'id_rol',
    as: 'usuarios'
});

Cupon.belongsTo(EstadoCupon, {
    foreignKey: 'estado',
    as: 'estadoCupon'
});

EstadoCupon.hasMany(Cupon, {
    foreignKey: 'estado',
    as: 'cupones'
});

Canje.belongsTo(Cupon, {
    foreignKey: 'cupon_id',
    as: 'cupon'
});

Cupon.hasMany(Canje, {
    foreignKey: 'cupon_id',
    as: 'canjes'
});

Canje.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    as: 'usuario'
});

Usuario.hasMany(Canje, {
    foreignKey: 'usuario_id',
    as: 'canjes'
});

module.exports = {
    Usuario,
    Rol,
    Canje,
    Cupon,
    EstadoCupon,
    sequelize
};