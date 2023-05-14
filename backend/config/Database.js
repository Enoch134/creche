import {Sequelize} from "sequelize"


const db = new Sequelize ('creche_db','root', 'Enoch@134', {
    host:"localhost",
    dialect:"mysql"
})

export default db;