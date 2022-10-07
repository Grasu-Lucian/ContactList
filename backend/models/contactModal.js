const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
  user: {
    type: String,
   
  },
  name: {
    type: String,
   
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },

},
{
    timestamps:true
});

module.exports=mongoose.model('Contact',contactSchema) 