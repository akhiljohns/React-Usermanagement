import mongoose from "mongoose";


const dbConnection= ()=>{
    mongoose.connect('mongodb+srv://rahul:rahul9895450559@atlascluster.nq8vqzn.mongodb.net/userManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Mongoose connection error:', err);
});

}



export default dbConnection