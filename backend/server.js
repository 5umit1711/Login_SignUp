import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import pkg from "jsonwebtoken";
import mongoose, { mongo } from "mongoose";
import twilio from "twilio"

// The project was not that big therefore i wrote the whole code in one file only...
const app = express();
const PORT = 3000;
const {jwt} = pkg
const url = "mongodb+srv://sumit1711kd:sumit@cluster0.sdgguxb.mongodb.net/?retryWrites=true&w=majority"
const accountSid = "AC3284eaf2b6f470ddf149e5b25e31827f"
const authToken = "1e824d57ab377006136e013a478f0a34"
const client = new twilio(accountSid, authToken);
let OTP;

const connection = async()=>{
    await mongoose.connect(url);
}

const OtpSender = async (OTP, number)=>{
    const message = await client.messages.create({
        body: `Your OTP is ${OTP}`,
        from: "+12244125365",
        to: `+91${number}`,
    }).then(message=> console.log(message))
    .catch(error=> console.log(error))
}

app.use(bodyParser.json());
app.use(cors());
connection();

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
})
const User = mongoose.model("User", UserSchema);

app.post("/signup", async(req,res)=>{
    try{
        const user =  new User(req.body);
        const doc = await user.save();
        console.log(doc);
        res.send("Signed up successfully")
    }catch(error){
        console.log(error)
    }
})

app.post("/login", async (req,res)=>{
    try{
        const {name, password} = req.body;
        const user = await User.findOne({name});

        if(!user){
            res.send("User not found");
        }
        if(user.password!==password){
            res.send("User not found")
        }
        else{
            res.send("User found");
        }
    }catch(error){
        console.log(error);
    }
})

app.post("/sendOTP", (req,res)=>{
    OTP = Math.floor(Math.random()*1000 + 1000)
    const {mobileNo} = req.body
    OtpSender(OTP, mobileNo)
    res.send("Otp sent")
})

app.post("/verify", (req,res)=>{
    const {userOTP} = req.body
    if(OTP==userOTP){
        res.send("Verified")
    }else{
        res.send("Not Verified");
    }
})

app.post("/reset", async (req,res)=>{
    const {name, newPassword} = req.body
    const user = await User.findOne({name})
    if(!user){
        res.send("User not found");
    }
    else{
        await User.updateOne({ name: name }, { $set: { password: newPassword } })
        res.send("Password Reset");
    }
})

app.listen(PORT, ()=>{
    console.log("Server started");
})
