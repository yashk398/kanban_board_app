import axios from 'axios'

const TEAM_MEMBER_URL = "http://localhost:8080/api/kanban_board/teamMemberLogin";
class TeamMemberService{
                teamMemberLogin(id, pass){
                        return axios.get(TEAM_MEMBER_URL +'/'+id+'/'+pass); 
                }

        
}

export default new TeamMemberService();
