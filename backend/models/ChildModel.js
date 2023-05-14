import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Employ from "./EmployeeModel.js";

const {DataTypes} = Sequelize

const Child = db.define('children',{
    childID:{
        type:DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    childName:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    dob:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    childGender:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    employeeId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
   
},{
    freezeTableName:true
})
Employ.hasMany(Child);
Child.belongsTo(Employ, { foreignKey: 'employeeId' });
export default Child;
