const API_URL = import.meta.env.VITE_API_URL;

class AuthService {


    async createAccount({username, password}){
        try {
            const response = await fetch(`${API_URL}/signup`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, password }),
            });
        
            const data = await response.json();
            
            if (!response.ok) {
                return {error:data.message};
            }
        
            console.log("Account created:", data);
            return data;
        
          } catch (error) {
            console.error("Account Creation Error:", error.message);
          }
    };


    async login({username, password}) {
        try {
            const response = await fetch(`${API_URL}/login`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, password }),
            });
        
            const data = await response.json();

            
            if (!response.ok) {
              return {error:data.message};
            }
        
            console.log("Login Successful ",data);

            return data;

          } catch (error) {
            console.error("Login Error:", error.message);
          }
    }

    async logout() {

        try{
            const response= await fetch(`${API_URL}/logout`, {
                method: "POST",
                credentials: "include", // Important for sending cookies
              });
              const data = await response.json();
              return {message:data.message};
        }
        catch(err){
            console.log("logout error",err.message);
        }
    }
}

const authService = new AuthService();

export default authService


