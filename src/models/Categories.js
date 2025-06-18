import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import slugify from "slugify";

export const Categories = sequelize.define('Categories',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'O campo é obrigatório.'
                },
            notEmpty:{
                msg:'O campo não pode ficar vazio.'
            }
        }        
    },
    slug:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    use_in_menu:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
        defaultValue:0
    }
},{
    timestamps:true,
    tableName:'categories',
    hooks:{
        beforeValidate:async(category)=>{
            if(!category.slug && category.name){
                category.slug = slugify(category.name, {lower:true});
            }
        }
    }
});
