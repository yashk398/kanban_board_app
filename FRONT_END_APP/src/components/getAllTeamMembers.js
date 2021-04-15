import React, { Component } from 'react';
import TeamLeadService from '../actions/TeamLeadService';
//import Header from '../../Header';
class GetAllTeamMembers extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            teamMemberEntity: []
        }
    }
    componentDidMount(){
        TeamLeadService.getAllTeamMembers(this.state.id).then(
            res => { 
                let list=[]
                let i=0;
                for(i=0;i<res.data.membersList.length;i++)
                {
                    if(res.data.membersList[i].projectEntity.projectId===this.state.id)
                    {
                        list.push(res.data.membersList[i]);
                    }
                }
                this.setState({teamMemberEntity:list})
            });
        }
        
    
    render() {
        return (
            <div className="container">
                {/* <Header/> */}
                
                <div className="row" style={{margin:'auto'}}>
                <div className="card col-md-12 card-view" >
                <h2 className="text-center mt-4 " >Member List of this team</h2>
                    <table className="table table-striped table-bordered table-color  " >
                        <thead>
                            <tr>                                
                                <th>Member Id</th>
                                <th>Member Name</th>
                                <th>Member's Employee Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                
                                this.state.teamMemberEntity.map(
                                    member => 
                                    <tr key= {member.teamMemberId}>
                                        <td>{member.teamMemberId}</td>
                                        <td>{member.teamMemberName}</td>
                                        <td>{member.employeeId}</td>
                                     </tr>  
                                )
                            }
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default GetAllTeamMembers;

<table style="background-color:#FFFFE0;">
<tr style="background-color:#BDB76B;">
<th>Table Header</th><th>Table Header</th>
</tr>
<tr>
<td>Table cell 1</td><td>Table cell 2</td>
</tr>
<tr>
<td>Table cell 3</td><td>Table cell 4</td>
</tr>
</table>
