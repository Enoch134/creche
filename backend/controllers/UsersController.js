import User from "../models/UsersModel.js";
import bcrypt from 'bcrypt';


export const getUsers = async(req, res) =>{
    try{
       const response = await User.findAll({
        attributes:['id', 'userUID', "userID", "userName", "userPhone", "userEmail", "role"],
        order:[
            ['createdAt', 'DESC']
        ]
       })
       res.status(200).json(response)
    }catch(error){
        res.status(500).json({msg:error.message})
    }
}

export const getUserById = async(req, res) =>{
    try{
        const response = await User.findOne({
            attributes:['id', 'userUID', "userID", "userName", "userPhone", "userEmail", "role"],
            where: {
              id: req.params.id
            }
        })
        res.status(200).json(response)
    }catch(error){
        res.status(500).json({msg:error.message})
    }
}

export const createUser = async (req, res) => {
    const { userID,userName, userPhone, userEmail, userPassword, confPassword, role } = req.body;

    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(userPassword)) {
        return res.status(400).json({ msg: "Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and symbols" });
    }

    if (userPassword !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password do not match" });

    const hashedPass = bcrypt.hashSync(userPassword, 10)
    try {
        await User.create({
            userID:userID,
            userName: userName,
            userEmail: userEmail,
            userPhone: userPhone,
            userPassword: hashedPass,
            role: role,
        });
        res.status(201).json({ msg: "Register Successful" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const updateUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    const { userID,userName, userPhone, userEmail, userPassword, confPassword, role } = req.body;

    if (userPassword !== confPassword) {
        return res.status(400).json({ msg: "Password and Confirm Password do not match" });
    }

    if (!userPassword || !confPassword) {
        return res.status(400).json({ msg: "Password and Confirm Password are required" });
    }

    const passwordRegex = /^(?=.*[a-zA-Z0-9])(?=.*[$@$!%*?&])[A-Za-z0-9$@$!%*?&]{8,}$/;
    if (!passwordRegex.test(userPassword)) {
        return res.status(400).json({ msg: "Password must contain at least 8 characters, including at least one letter, one number, and one symbol" });
    }

    let hashedPass;
    try {
        hashedPass = await bcrypt.hash(userPassword, 10);
    } catch (error) {
        return res.status(500).json({ msg: "Error hashing password" });
    }

    try {
        await User.update(
            {
                userID:userID,
                userName: userName,
                userEmail: userEmail,
                userPhone: userPhone,
                userPassword: hashedPass,
                role: role,
            },
            {
                where: {
                    id: user.id,
                },
            }
        );
        res.status(200).json({ msg: "User Updated Successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateTokenUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            token: req.params.id,
            token: req.params.token
        }
    });
    const { userPassword, confPassword } = req.body;
    let hashedPass;
    if (userPassword === "" || userPassword === null) {
        hashedPass = user.userPassword
    } else {
        hashedPass = bcrypt.hashSync(userPassword, 10)
    }
    if (userPassword !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password do not match" });
    try {
        await User.update({
            userPassword: hashedPass,
        }, {
            where: {
                token: req.params.id,
                token: req.params.token
            }
        });
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User not found" });

    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        if (user) return res.status(200).json({ alert: "Are Sure Do you want to delete this user" });
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
