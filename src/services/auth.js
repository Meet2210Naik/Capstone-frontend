import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000';

//Login fucntion
export async function loginUser(email,password){
    try{
        const response = await axios.post(`${API_BASE}/api/users/login/`, {email,password});
        return response.data;
    } 
    catch(error){
        console.error('Login failed',error.response?.data || error.message);
        throw error;
    }
}



export async function SigninUser(userData) {
    
    const { userName, email, password, role, companyName } = userData;

    const payload = {
        name : userName,
        email,
        password,
        role,
        ...(role === "company" && { companyName })
    };

    try {
        const response = await axios.post(`${API_BASE}/api/users/`, payload);
        return response.data;
    }
    catch (error) {
        console.error('Signin failed', error.response?.data || error.message);
        throw error;
    }   
}