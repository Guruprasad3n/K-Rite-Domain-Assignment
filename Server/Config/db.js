const mongoose = require("mongoose")

const connectDB = async()=>{
   try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("DB Connected")
   }
   catch(error){
    console.log("Error in Mongo Connection")
   }
}
module.exports  = connectDB

// , {
//     useNewUrlParser: true,
//   useUnifiedTopology: true,
// }