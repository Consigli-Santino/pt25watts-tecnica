const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('EstadoCupon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'estados_cupon'
    });
};