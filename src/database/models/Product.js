module.exports = (sequelize, DataTypes) => {
    const alias = "Product";
    const cols = {
        product_id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        productName: {
            allowNull: false,
            type: DataTypes.STRING
        },
        productPrice: {
            allowNull: false,
            type: DataTypes.DECIMAL(10, 2)
        },
        shortDescription: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        nutritionalDetail: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        productImage: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        productCategory: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    };
    const config = {
        tableName: "products",
        timestamps: false,
    }

    const Product = sequelize.define(alias, cols, config);

    return Product;
}