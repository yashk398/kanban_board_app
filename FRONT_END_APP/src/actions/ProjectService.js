import axios from 'axios';

const ASSESSMENT_API_BASE_URL = "http://localhost:8080/api/kanban_board";

class ProjectService {

    // addProject(project){
    //     return axios.post(`${ASSESSMENT_API_BASE_URL}/addProject`,project);
        createProject(project){
            // return axios.post(ASSESSMENT_API_BASE_URL+ +project);
            return axios.post(ASSESSMENT_API_BASE_URL+'/addProject',project);
        }
        deleteProject(projectId){
            return axios.delete(ASSESSMENT_API_BASE_URL+ '/deletetproject' ,projectId);
        }
        
    }


export default new ProjectService();