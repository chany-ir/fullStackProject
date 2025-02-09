import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL
axios.defaults.baseURL = apiUrl; 

axios.interceptors.response.use(
  response => {
   
    return response;
  },
  error => {
    
    console.error('Axios error response:', error.response ? error.response.data : error.message);
    return Promise.reject(error); 
  }
);

export default {
  getTasks: async () => {
    try {
      const result = await axios.get("/tasks");
      console.log("i am");
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.error('Error fetching tasks:', error.response ? error.response.data : error.message);
      throw error;
    }
  },
  addTask: async (name) => {
    console.log('addTask', name)
    try {
      const task = { taskName: name, isComplete: false };
      const result = await axios.post(`/tasks`, task);
      return result.data;
    }
    catch (error) {

      console.error('Error adding task:', error);
      throw error;
    }
  },
  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete })
    try {
      const result = await axios.put(`/tasks/${id}`, { isComplete }); 
      return result.data;
    }
    catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    console.log('deleteTask')
    try {
      const result = await axios.delete(`/tasks/${id}`);
      return result.data;
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }
};

