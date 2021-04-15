
import axios from 'axios'

const TEAM_LEAD_URL="http://localhost:8080/api/kanban_board/"
class TeamLeadService{
        teamLeadLogin(id, pass){
                return axios.get(TEAM_LEAD_URL+'teamLeadLogin/'+id+'/'+pass); 
        }
        getProjectByTeamLeadId(id){
                return axios.get(TEAM_LEAD_URL+'teamlead/'+id);
        }
        getAllTeamMembers(id){
            return axios.get(TEAM_LEAD_URL+'getteammembers/?projectId='+id);
        }
        updateStatus(id,status)
        {
                return axios.get(TEAM_LEAD_URL+'updatestatus?projectStatus='+status+'&projectId='+id);
        }
}

export default new TeamLeadService();
