import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Employ from "./EmployeeModel.js";
import Child from "./ChildModel.js";
import Dept from "./DepartmentModel.js";
import User from "./UsersModel.js";

const {DataTypes} = Sequelize

const Register = db.define ('register_child',{
   registerID:{
    type:DataTypes.STRING,
    defaultValue:DataTypes.UUIDV4,
    allowNull:false,
    validate:{
        notEmpty:true
      }
    },
    dropped_off_by:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
   },
   droppe_off_contact:{
    type:DataTypes.STRING,
    allowNull:false,
    validate:{
        notEmpty:true
      }
   },
   arrival_info:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
         notEmpty:true
    }
},
arrival_time:{
    type:DataTypes.STRING,
    allowNull:false,
    validate:{
        notEmpty:true
    }
},
collected_by:{
    type:DataTypes.STRING,
    allowNull:false,
    validate:{
        notEmpty:true
    }
},
collected_by_contact:{
    type:DataTypes.STRING,
    allowNull:false,
    validate:{
        notEmpty:true
    }
},
departure_info:{
    type:DataTypes.STRING,
    allowNull:false,
    validate:{
        notEmpty:true
    }
},
employeeId:{
    type:DataTypes.INTEGER,
    allowNull:true,
    validate:{
        notEmpty:false
    }
},
childrenId:{
    type:DataTypes.INTEGER,
    allowNull:true,
    validate:{
        notEmpty:false
    }
},
userId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    validate:{
        notEmpty: true
    }
}

},{
    freezeTableName:true
})
User.hasMany(Register);
Child.hasMany(Register);
Employ.hasMany(Register);
Register.belongsTo(User, { foreignKey: 'userId' });
Register.belongsTo(Child, { foreignKey: 'childrenId' });
Register.belongsTo(Employ, { foreignKey: 'employeeId' });
export default Register;
