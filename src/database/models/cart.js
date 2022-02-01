module.exports = (sequelize, DataTypes) => {
    const alias = "Cart";

    const cols = {
        cart_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        orderNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        payment: {
            allowNull: false,
            type: DataTypes.STRING
        },
    }

    const config = {
        tableName: "carts",
        timestamps: false
    }

    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = (models) => {

        Cart.hasMany(models.Item, {
            as: "items",
            foreignKey: "cart_id",
        });
        Cart.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id",
        });

    }

    return Cart;
}