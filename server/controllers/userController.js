import userModel from "../models/user"
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import cloudinary from "../utils/cloudinary"


const postSignup = async (req, res) => {

    console.log(req.body);
    const { name, email, password } = req.body;
    try {
        const userExist = await userModel.findOne({ email: email });
        if (userExist) {
            res.send({
                success: false,
                message: 'User already exist, please login'
            });
        } else {
            const hash = await bcrypt.hash(password, 12);
            const user = new userModel({
                name: name,
                email: email,
                password: hash
            })
            const newUser = await user.save()

            // const key = crypto.randomBytes(32).toString('hex')
            const key = 'secure_key'

            const token = jwt.sign(
                { user_id: newUser._id, email },
                key,
                {
                    expiresIn: "2h",
                }
            )

            res.cookie('token', token, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 })
            res.send({
                success: true,
                message: 'User created successfully',

                user: newUser
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

const postLogout = async (req, res) => {

    try {
        const token = req.cookies.token;
        if (!token) {
            res.send({
                success: false,
                message: 'You are not logged in'
            });
        } else {
            res.clearCookie('token');
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

const getUser = async (req, res) => {
    try {
        // const token = req.cookie.token;
        // const key = 'secure_key';
        // const decodedToken = jwt.verify(token, key);
        // const userId = decodedToken._id;

        const email = req.body.email

        // const user = await userModel.findById(userId)
        const user = await userModel.findOne({ email })
        console.log(user, "uuuuusssssseeeeeerrrrrrr");
        if (user) {
            return res.send({
                success: true,
                message: 'user data retrieved',
                data: user
            });
        } else {
            return res.send({
                success: false,
                message: 'no user found for userId'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.send({
            success: false,
            message: 'error retrieving user data'
        });
    }
}


const postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            console.log('email not found');
            return res.send({
                success: false,
                message: 'email not found'
            });
        }
        const isPassValid = await bcrypt.compare(password, user.password);
        if (!isPassValid) {
            console.log('wrong pass');
            return res.send({
                success: false,
                message: 'invalid password'
            });
        }
        //   const key = crypto.randomBytes(32).toString('hex');
        const key = 'secure_key'


        const token = jwt.sign(
            { user_id: user._id, email },
            key,
            {
                expiresIn: "2h",
            }
        );
        res.cookie('token', token, { httpOnly: true });
        return res.send({
            success: true,
            message: 'login successful',
            user: user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const updatePic = async (req, res) => {
    const token = req.cookies.token;
    const key = 'secure_key';

    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });
                stream.write(fileBuffer);
                stream.end();
            });
        };

        const result = await streamUpload(req.file.buffer);
        const decoded = jwt.verify(token, key);
        const user= await userModel.findByIdAndUpdate(decoded.user_id, {
            image: result.secure_url
        })
        console.log(user,"/////////");
           return res.send({ message: "Profile picture updated successfully", user, success:true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};




export { postSignup, postLogout, getUser, postLogin, updatePic }


