import userModel from "../models/user"
import jwt from 'jsonwebtoken'


const adminEmail = "admin@gmail.com"
const adminPassword = "123456"
const key = 'secure_key'


const postLogin = async (req, res) => {
  const { email, password } = req.body
  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign(
      {admin: adminEmail },
      key,
      { expiresIn: '2h' }
    );
  res.cookie('adminToken', token, { httpOnly: true })
    const users = await userModel.find()
    res.send({
      users,
      success: true,
      message: "Admin login successful"
    })
  } else {  
    res.send({
      success: false,
      message: "incorrect login details"
    })
  }

}
const postDelete = async (req, res) => {
  await userModel.deleteOne({ _id: req.params.id });

  try {
    const updatedUsers = await userModel.find();

    res.send({
      success: true,
      message: "User deleted successfully",
      users: updatedUsers,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to fetch updated user list",
      error: error.message,
    });
  }
}

const getUsers = async (req, res) => {
  try {
    const updatedUsers = await userModel.find();
    console.log("updated users: ",updatedUsers);
    res.send({
      success: true,
      message: "User deleted successfully",
      users: updatedUsers,
    });
  } catch (error) {
    console.log("getusers error");
    res.send({
      success: false,
      message: "Failed to fetch updated user list",
      error: error.message,
    });
  }
}

const postEditUser = async (req, res) => {
  console.log("at controller");
  const userId = req.params.id
  console.log("userId: ", userId);
  const { name, email } = req.body
  console.log("name,email: ", name,email);

  try {
    await userModel.findByIdAndUpdate(userId, { name, email })
    const updatedUsers = await userModel.find()
    res.send({
      success: true,
      message: "user updated successfuly",
      users: updatedUsers
    })
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Failed to update user",
      error: error.message,
    })
  }
}

const postLogout=(req,res)=>{
  try {
    const token = req.cookies.adminToken;
    if (!token) {
        res.send({
            success: false,
            message: 'You are not logged in'
        });
    } else {
        res.clearCookie('adminToken');
        res.send({
            success: true,
            message: 'You have been logged out'
        });
    }
} catch (err) {
    console.error(err);
    res.status(500).send({
        success: false,
        message: 'Internal server error'
    });
}
}




export { postLogin, postDelete, getUsers, postEditUser, postLogout } 