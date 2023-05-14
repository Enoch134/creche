import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} =Sequelize

const Dept = db.define('department',{
    deptID:{
        type:DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    deptName:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
},{
    freezeTableName:true
})
export default Dept;