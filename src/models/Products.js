import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import slugify from "slugify";
import { ProductsImages } from "./Products-Images.js";
import { ProductsOptions } from "./Products-Options.js";
import { ProductsCategories } from "./Products-Categories.js";
import { Categories } from "./Categories.js";

export const Products = sequelize.define('Products',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    enable:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
        defaultValue:0
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
    },
    stock:{
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue:0
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    }, 
    price_with_discount:{
        type:DataTypes.FLOAT,
        allowNull:false
    } 
},{
    timestamps:true,
    tableName:'products',
    hooks:{
        beforeValidate:async(product)=>{
            if(!product.slug && product.name){
                product.slug = slugify(product.name, {lower:true});
            }
        }
    }
});
