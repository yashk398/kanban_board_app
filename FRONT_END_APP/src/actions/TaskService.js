import axios from 'axios'

const TASK_URL = "http://localhost:8080/api/kanban_board/tasks/";
class TaskService{
        fetchAllTasks(){
                return axios.get(TASK_URL); 
        }

        addTask(object, fkey){ 
                return axios.post(TASK_URL+'/'+fkey, object);
        }

        updateTask(object, fkey){ 
                return axios.put(TASK_URL+fkey, object);
        }

        deleteTask(pkey){ 
                return axios.delete(TASK_URL+pkey);
        }
}

export default new TaskService();
