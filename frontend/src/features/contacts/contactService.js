import axios from "axios";
const API_URL = "http://localhost:8000/api/contacts/";
//Register user
//  |  |  |  |
//  |  |  |  |
// \/ \/ \/ \/
const createContact = async (contactData,token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL,contactData ,config);
  return response.data;
};
const getContacts = async ( token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
const response=await axios.get(API_URL,config)
return response.data
};
const getContact = async ( contactId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
const response=await axios.get(API_URL+contactId,config)
return response.data
};
const deleteContact = async ( contactId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
const response=await axios.delete(API_URL+contactId,config)
return response.data
};
const updateContact = async ( contactData, token) => {

  const config = { headers: { Authorization: `Bearer ${token}` } };
const response=await axios.put(API_URL+contactData._id,contactData,config)
return response.data
};


const authService = { createContact,getContacts ,getContact,updateContact,deleteContact};
export default authService;
