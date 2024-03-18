const mongoose = require("mongoose")

const connectDB = async()=>{
   try{
    await mongoose.connect(`mongodb+srv://todo:guruabc@cluster0.ao3owst.mongodb.net/dns?retryWrites=true&w=majority&appName=Cluster0`)
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