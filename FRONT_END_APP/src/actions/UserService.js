import axios from 'axios'

const USER_LOGIN_URL = "http://localhost:8080/api/kanban_board/login";
class UserService{
                userLogin(loginCreds){
                        return axios.post(USER_LOGIN_URL, loginCreds, ); 
                }

        
}

export default new UserService();
