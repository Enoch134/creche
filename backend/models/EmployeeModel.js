import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Dept from "./DepartmentModel.js";

const {DataTypes} = Sequelize

const Employ = db.define('employee', {
    employID:{
        type:DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    employName:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    employContact:{
        type:DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    departmentId:{
        type:DataTypes.INTEGER,
        allowNull:true,
        validate:{
            notEmpty:false
        }
    },  
},{
    freezeTableName:true
})
Dept.hasMany(Employ);
Employ.belongsTo(Dept, { foreignKey: 'departmentId' });
export default Employ;