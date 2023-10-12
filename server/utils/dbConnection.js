import mongoose from "mongoose";


const dbConnection= ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1",{dbName: "usermanagement"}, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Mongoose connection error:', err);
});

}



export default dbConnection