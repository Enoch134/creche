import Register from "../models/RegisterModel.js";
import User from "../models/UsersModel.js";
import Employee from "../models/EmployeeModel.js";
import Child from "../models/ChildModel.js";
import Dept from "../models/DepartmentModel.js";
import { Op } from "sequelize";
// import twilio from 'twilio';


// const accountSid = 'ACd8d66da12b63666c32f7aafe32903786';
// const authToken = 'cc1cf4d983dfa84c867a6c8bbf43944e';
// const client = new twilio(accountSid, authToken);



export const getRegister = async(req, res) =>{
  try{
     const response = await Register.findAll({
      attributes:['id', 'dropped_off_by', "droppe_off_contact",
       "arrival_info", "arrival_time", "collected_by", "collected_by_contact", 
       "departure_info", "departure_Time", "employeeId", "childrenId","departmentId", "userId"
      ],
      include: [
        {
          model: Employee,
          attributes: ['id', 'employName', 'employContact'],
          where:{
            id:req.body.emp
        }
        },
        {
          model: Child,
          attributes: ['id', 'childName','dob','childGender'],
        },
        {
          model: User,
          attributes: ['id', 'userName'],
        },
        {
          model: Dept,
          attributes: ['id', 'deptName'],
        }
      ]
     })
     res.status(200).json(response)
  }catch(error){
      res.status(500).json({msg:error.message})
  }
}



export const getRegisterById = async (req, res) => {
  try {
      const register_child = await Register.findOne({
          where: {
              id: req.params.id
          },
      });
      if (!register_child) return res.status(404).json({ msg: "Data Not Found" });
      let response;
      if (req.role === "admin","user") {
          response = await Register.findOne({
            attributes:['id', 'dropped_off_by', "droppe_off_contact",
            "arrival_info", "arrival_time", "collected_by", "collected_by_contact", 
            "departure_info", "departure_Time","employeeId", "childrenId","departmentId", "userId"
           ],
              where: {
                  id: register_child.id
              },
              include: [
                {
                  model: Employee,
                  attributes: ['id', 'employName', 'employContact'],
                },
                {
                  model: Child,
                  attributes: ['id', 'childName','dob','childGender'],
                },
                {
                  model: User,
                  attributes: ['id', 'userName'],
                },
                {
                  model: Dept,
                  attributes: ['id', 'deptName'],
                }
              ]
          });
      }
      res.status(200).json(response);
  } catch (error) {
      res.status(500).json({ msg: error.message });
  }
}

export const updateRegister = async (req, res) => {
  try {
      const register_child = await Register.findOne({
          where: {
              id: req.params.id
          }
      });

      if (!register_child) return res.status(404).json({ msg: "No employee Found" });

      const { id, dropped_off_by, droppe_off_contact,
      arrival_info, arrival_time, collected_by, collected_by_contact, 
      departure_info,departure_Time} = req.body;
     
          await Register.update({id, dropped_off_by, droppe_off_contact,
            arrival_info, arrival_time, collected_by, collected_by_contact, 
            departure_info,departure_Time}, {
              where: {
                  id: register_child.id
              }
          });
      res.status(200).json({ msg: "Employee updated successfully" });
  } catch (error) {
      res.status(500).json({ msg: error.message });
  }
}


  // export const createRegisters = async (req, res) => {
  //   const { dropped_off_by, droppe_off_contact, arrival_info, arrival_time, collected_by,
  //       collected_by_contact, departure_info,departure_Time, employeeId, childrenId, departmentId, } = req.body;
  
  //   try {
  //     await Register.create({ 
  //       dropped_off_by:dropped_off_by, 
  //       droppe_off_contact:droppe_off_contact, 
  //       arrival_info:arrival_info, 
  //       arrival_time:arrival_time,
  //       collected_by:collected_by,
  //       collected_by_contact:collected_by_contact,
  //       departure_info:departure_info,
  //       departure_Time:departure_Time,
  //       employeeId:employeeId,
  //       childrenId:childrenId,
  //       departmentId:departmentId,


  //       userId:req.userId 
  //     });
  
  //     res.status(201).json({ msg: 'Register Successful' });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ msg: error.message });
  //   }
  // };

  //this is to search for specific days, day, and time and give report 

  export const createRegisters = async (req, res) => {
    const { dropped_off_by, droppe_off_contact, arrival_info, arrival_time, employeeId, childrenId, departmentId} = req.body;
  
    try {
      // // Validate the phone number using Twilio's lookups API
      // const lookup = await client.lookups.v1.phoneNumbers(droppe_off_contact).fetch();
      // if (lookup.isValid === false) {
      //   throw new Error('Invalid phone number');
      // }
  
      await Register.create({ 
        dropped_off_by: dropped_off_by, 
        droppe_off_contact: droppe_off_contact, 
        arrival_info: arrival_info, 
        arrival_time: arrival_time,
        employeeId: employeeId,
        childrenId: childrenId,
        departmentId: departmentId,
        userId: req.userId 
      });
  
      // // Send an SMS to the user's phone number using Twilio
      // const message = await client.messages.create({
      //   body: 'Your child registration process has been successful for today',
      //   from: '23279482050',
      //   to: "+23279482050"
      // });
  
      console.log(message.sid);
  
      res.status(201).json({ msg: 'Register Successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: error.message });
    }
  };
  


  export const registerSearch = async(req,res) =>{
  const {startDate, endDate}=req.body
  try{
      let response;
      if(req.role ==="user"){
          response = await Register.findAll({
          where:{
             arrival_time: {
                  [Op.between]: [startDate, endDate]
               }
          },
          order:[
             [ 'arrival_time', 'DESC']
          ],
          include: [
            {
              model: User,
              attributes: ['id', 'userName'],
          },
        ]
             
        
          })
      }
      res.status(200).json(response)
  }catch(error){
      res.status(500).json({msg:error.message})
  }
  
}

export const searchChild = async(req,res) =>{
  const {childrenId}=req.body
  try{
      let response;
          response = await Register.findAll({
          where:{

            childrenId: childrenId
          },
          include: [
            {
              model: Child,
              attributes: ['id', 'childName','dob','childGender'],
            },
         ]
          })
      res.status(200).json(response)
  }catch(error){
      res.status(500).json({msg:error.message})
  }
  
}

export const getCountRegisterPerDay = async(req,res) =>{
   // Get today's date
   const today = new Date();
   today.setHours(0, 0, 0, 0);
try{
  // Count the number of users added 5 days ago
  let response;
   response = await Register.count({
    where: {
      arrival_time: {
        [Op.gte]: today,
      },
    },
 });
 res.status(200).json(response)
}catch(error){
  res.status(500).json({msg:error.message})
}
}


 export const getCountRegisterChild = async(req,res) =>{
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    fiveDaysAgo.setHours(0, 0, 0, 0);

    // Get the date 1 day ago
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    oneDayAgo.setHours(23, 59, 59, 999);
  try{
    // Count the number of users added 5 days ago
    let response;
     response = await Register.count({
    where: {
      arrival_time: {
         [Op.between]: [fiveDaysAgo, oneDayAgo],
      },
    },
   });
   res.status(200).json(response)
  }catch(error){
    res.status(500).json({msg:error.message})
  }
 }

export const getCountRegisterChildOneMonth = async(req,res) =>{
   // Get the date one month ago
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
oneMonthAgo.setHours(0, 0, 0, 0);

// Get the date today
const today = new Date();
today.setHours(23, 59, 59, 999);
try{
  // Count the number of users added 5 days ago
  let response;
   response = await Register.count({
    where: {
      arrival_time: {
        [Op.between]: [oneMonthAgo, today],
      },
    },
 });
 res.status(200).json(response)
}catch(error){
  res.status(500).json({msg:error.message})
}
}


export const getLinearForFiveDays = async(req,res) =>{
     // Get the date five days ago
const fiveDaysAgo = new Date();
fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
fiveDaysAgo.setHours(0, 0, 0, 0);

// Get the date today
const today = new Date();
today.setHours(23, 59, 59, 999);

// Count the number of users added in the past five days
const counts = [];
const days = [];
for (let i = 0; i < 5; i++) {
  const date = new Date(fiveDaysAgo);
  date.setDate(date.getDate() + i);
  date.setHours(0, 0, 0, 0);
  const nextDate = new Date(fiveDaysAgo);
  nextDate.setDate(nextDate.getDate() + i + 1);
  nextDate.setHours(0, 0, 0, 0);
  const count = await Register.count({
    where: {
      arrival_time: {
        [Op.between]: [date, nextDate],
      },
    },
  });
  days.push(date.toLocaleDateString());
  counts.push(count);
}

// Use the counts and days arrays to generate the chart data
const chartData = {
  labels: days,
  datasets: [
    {
      label: 'Number of users added in the past five days',
      data: counts,
    },
  ],
};

return res.json(chartData)
}



export const getLinearForSevenDays = async (req, res) => {
  // Get the date seven days ago
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  // Get the date today
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  // Count the number of users added in the past seven days
  const counts = [];
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(sevenDaysAgo);
    date.setDate(date.getDate() + i);
    date.setHours(0, 0, 0, 0);
    const nextDate = new Date(sevenDaysAgo);
    nextDate.setDate(nextDate.getDate() + i + 1);
    nextDate.setHours(0, 0, 0, 0);
    const count = await Register.count({
      where: {
        arrival_time: {
          [Op.between]: [date, nextDate],
        },
      },
    });
    days.push(date.toLocaleDateString());
    counts.push(count);
  }

  // Use the counts and days arrays to generate the chart data
  const chartData = {
    labels: days,
    datasets: [
      {
        label: "Number of users added in the past seven days",
        data: counts,
      },
    ],
  };

  // Return the chart data
  return res.json(chartData);
};

export const getLinearForMonth = async (req, res) => {
  // Get the date one month ago
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  oneMonthAgo.setHours(0, 0, 0, 0);

  // Get the date today
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  // Count the number of Register in each day of the past month
  const counts = [];
  const days = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(oneMonthAgo);
    date.setDate(date.getDate() + i);
    date.setHours(0, 0, 0, 0);
    const nextDate = new Date(oneMonthAgo);
    nextDate.setDate(nextDate.getDate() + i + 1);
    nextDate.setHours(0, 0, 0, 0);
    const count = await Register.count({
      where: {
        arrival_time: {
          [Op.between]: [date, nextDate],
        },
      },
    });
    days.push(date.toLocaleDateString());
    counts.push(count);
  }

  // Use the counts and days arrays to generate the chart data
  const chartData = {
    labels: days,
    datasets: [
      {
        label: "Number of users added in the past month",
        data: counts,
      },
    ],
  };

  // Return the chart data
  return res.json(chartData);
};



export const getLinearForYear = async (req, res) => {
  // Get the date one year ago
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear());
  oneYearAgo.setHours(0, 0, 0, 0);

  // Get the date today
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  // Count the number of Register added in each day of the past year
  const counts = [];
  const days = [];
  for (let i = 0; i < 365; i++) {
    const date = new Date(oneYearAgo);
    date.setDate(date.getDate() + i);
    date.setHours(0, 0, 0, 0);
    const nextDate = new Date(oneYearAgo);
    nextDate.setDate(nextDate.getDate() + i + 1);
    nextDate.setHours(0, 0, 0, 0);
    const response = await Register.count({
      where: {
        arrival_time: {
          [Op.between]: [date, nextDate],
        },
      },
    });
    days.push(date.toLocaleDateString());
    counts.push(response);
  }

  // Use the counts and days arrays to generate the chart data
  const chartData = {
    labels: days,
    datasets: [
      {
        label: "Number of users added in the past year",
        data: counts,
      },
    ],
  };

  // Return the chart data
  return res.json(chartData);
};



