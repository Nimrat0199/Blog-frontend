const API_URL = import.meta.env.VITE_API_URL;

class blogsfunc{
    async getAllBlogs(){
        try{
            const response = await fetch(`${API_URL}/blogs`, {
                method: "GET",
                credentials: "include" // Ensures cookies are sent
              });
            const data = await response.json();
            if(!response.ok) return {error:data.message};
            return data;
        }catch(err){
            console.log("error fetching all the blogs: ",err.message)
        }
    }

    async searchBlogs(text){
        try{
            const response = await fetch(`${API_URL}/search`, {
                method: "POST",
                credentials: "include", // Ensures cookies are sent
                headers: { "Content-Type": "application/json" }, // Set JSON header
                body: JSON.stringify({ text }), // Send text inside an object
              });
            const data = await response.json();
            if(!response.ok) return [{error:data.message}];
            return data;
        }catch(err){
            console.log("error fetching all the blogs: ",err.message)
        }
    }

    async getUserBlogs(id){
        try{
            const response = await fetch(`${API_URL}/userBlogs/${id}`, {
                method: "GET",
                credentials: "include" // Ensures cookies are sent
              });
            const data = await response.json();
            if(!response.ok) return {error:data.message};
            return data;
        }catch(err){
            console.log("error fetching user's blogs: ",err.message)
        }
    }

    async getBlog(id){
        try{
            const response = await fetch(`${API_URL}/blogs/${id}`, {
                method: "GET",
                credentials: "include" // Ensures cookies are sent
              });
            const data = await response.json();
            if(!response.ok) return {error:data.message};
            return data;
        }catch(err){
            console.log("error fetching single blog: ",err.message)
        }
    }

    async createBlog(formData){
        try{
            const response = await fetch(`${API_URL}/blogs`, {
                method: "POST",
                credentials: "include" ,
                body: formData,
            });
            console.log("creating Blog")
            console.log("response is : ", response);
            const data = await response.json();
            console.log("data is : " , data);
            if(!response.ok) return {error: data.message || "Something went wrong" };
            return data;
        }catch(err){
            console.log("error creating blog :" , err.message);
            return {error:err.message}
        }
    }

    async deleteBlog(id){
        try{
            const resp = await fetch(`${API_URL}/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
            });
            const data = resp.json();
            if(!resp.ok) return {error:data.message};
            return data;
        }catch(err){
            console.log("error deleting blog : ",err.message);
        }
    }

    async updateBlogImg(id, file) {
        try {
            const formData = new FormData();
            formData.append("file", file);  // Append file
    
            const response = await fetch(`${API_URL}/blogs/${id}/img`, {
                method: 'PUT',
                body: formData,  // Send FormData
            });
    
            const data = await response.json();  // Await response
            if (!response.ok) return { error: data.message };
            return data;
    
        } catch (err) {
            console.log("Error updating image:", err.message);
            return { error: err.message }; // Ensure error is returned
        }
    }

    async updateBlog(id,data){
        try{
            const response = await fetch(`${API_URL}/blogs/${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const res = response.json();
            if(!response.ok) return {error:res.message};
            return res;
        }catch(err){
            console.log("error updating blog", err.message);
        }
    }

}

const Blogfeatures = new blogsfunc();

export default Blogfeatures;