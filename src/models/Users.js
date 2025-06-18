import { sequelize } from '../config/database.js';
import  DataTypes from 'sequelize';
import bcrypt from 'bcrypt';

export const Users = sequelize.define('Users', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    firstname:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    surname:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},{
    timestamps:true,
    tableName:'users',
    hooks:{
        beforeCreate:async(user)=>{
            user.password = await bcrypt.hash(user.password, 10);
        },
        beforeUpdate:async(user)=>{
            if(user.changed('password')){
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    }
})