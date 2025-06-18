import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
export const ProductsCategories = sequelize.define('ProductsCategories',{
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'products',
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    },
    categorie_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'categories',
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    }
},{
    tableName:'products-categories',
});