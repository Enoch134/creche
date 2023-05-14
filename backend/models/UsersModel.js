import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const {DataTypes} = Sequelize

const User = db.define('users',{
    userUID:{
        type:DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    userID:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    userPhone:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    userEmail:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    userPassword:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    token:{
        type:DataTypes.TEXT,
        allowNull:true,
        validate:{
            notEmpty:false
        }
    }
},{
    freezeTableName:true
})

export default User;