const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Cupon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        codigo: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        valor: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        fecha_expiracion: {
            type: DataTypes.DATE,
            allowNull: false
        },
        estado: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'estados_cupon',
                key: 'id'
            }
        }
    }, {
        tableName: 'cupones',
        timestamps: true,
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_actualizacion'
    });
};