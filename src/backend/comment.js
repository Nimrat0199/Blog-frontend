const API_URL = import.meta.env.VITE_API_URL;

class commentsFunc {
    async getComments(blogId) {
        try {
            const response = await fetch(`${API_URL}/blogs/${blogId}/comments`, {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            if (!response.ok) return { error: data.message };
            return data;
        } catch (err) {
            console.log("Error fetching comments: ", err.message);
            return { error: err.message };
        }
    }

    async createComment(blogId, com) {
        try {
            const response = await fetch(`${API_URL}/blogs/${blogId}/comments`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(com),
            });
            const data = await response.json();
            if (!response.ok) return { error: data.message };
            return data;
        } catch (err) {
            console.log("Error creating comment: ", err.message);
            return { error: err.message };
        }
    }

    async updateComment(blogId,commentId, content) {
        try {
            const response = await fetch(`${API_URL}/blogs/${blogId}/comments/${commentId}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content }),
            });
            const data = await response.json();
            if (!response.ok) return { error: data.message };
            return data;
        } catch (err) {
            console.log("Error updating comment: ", err.message);
            return { error: err.message };
        }
    }

    async deleteComment(blogId,commentId) {
        try {
            const response = await fetch(`${API_URL}/blogs/${blogId}/comments/${commentId}`, {
                method: "DELETE",
                credentials: "include",
            });
            const data = await response.json();
            if (!response.ok) return { error: data.message };
            return data;
        } catch (err) {
            console.log("Error deleting comment: ", err.message);
            return { error: err.message };
        }
    }
}

const CommentFeatures = new commentsFunc();

export default CommentFeatures;
