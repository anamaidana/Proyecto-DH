module.exports = (sequelize, DataTypes) => {
    const alias = "Item";

    const cols = {
        item_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        subtotal: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },

        state: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        cart_id: {
            type: DataTypes.INTEGER,
        },
    }


    const config = {
        tableName: "items",
        timestamps: false
    }

    const Item = sequelize.define(alias, cols, config);
    Item.associate = (models) => {
        Item.belongsTo(models.Cart, {
            as: "cart",
            foreignKey: "cart_id",
        });

        Item.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id",
        });

        Item.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id",
        });
    }

    return Item;
}