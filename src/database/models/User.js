module.exports = (sequelize, DataTypes) => {
    const alias = "User";
    const cols = {
        user_id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        confirmPassword: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        rights: {
            type: DataTypes.INTEGER,
        },
    };
    const config = {
        tableName: "users",
        timestamps: false,
    }

    const User = sequelize.define(alias, cols, config);
    // Asociación con el carrito
    User.associate = (models) => {
        User.hasMany(models.Item, {
            as: 'items',
            foreignKey: 'user_id',
        });

        // Asociación con carts
        User.hasMany(models.Cart, {
            foreignKey: "user_id",
            as: "carts",
        });
    }

    return User;
}