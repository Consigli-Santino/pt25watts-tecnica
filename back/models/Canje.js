const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Canje', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cupon_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cupones',
                key: 'id'
            }
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'id'
            }
        },
        codigo_canjeado: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        fecha_canje: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'canjes',
        timestamps: true,
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_actualizacion'
    });
};