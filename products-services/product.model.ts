import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';
export class Product extends Model {
    public id!: number;
    public name!: string;
    public price!: number;
    public description!: string;
    public url!: string;
    public creator!: string;
    public createdDate!: Date;
    public updatedDate!: Date;
}
Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    creator: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    createdDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    updatedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Product',
    timestamps: false,
});


module.exports = Product;