import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const ProductsOptions = sequelize.define('ProductsOptions',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'products',
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    shape:{
        type:DataTypes.ENUM('square', 'circle'),
        allowNull:true,
        defaultValue:"square"
    },
    radius:{
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue:0,
        validate:{
            min:0,
            max:100
        }
    },
    type:{
        type:DataTypes.ENUM('text','color'),
        allowNull:true,
        defaultValue:"text"
    },
    values:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:{msg:'Campo "values" não pode estar vazio.'}
            }
        }
    }
},{
    tableName:'products-options'
});