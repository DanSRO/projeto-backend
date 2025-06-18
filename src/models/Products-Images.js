import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const ProductsImages = sequelize.define('ProductsImages',{
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
    path:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:{msg:'Campo "path" é obrigatório.'},                
            },
            notEmpty:{
                msg:{msg:'Campo "path" não pode estar vazio.'}
            }
        }
    },    
},{    
    tableName:'products-images',
});