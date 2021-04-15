import React, { Component } from 'react';
import ProjectService from '../actions/ProjectService';
import ListProjects from './ListProjects';

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: '',
           projectName: '',
            startDate: '',
            endDate: '',
            projectDescription: '' ,
            projectStatus: '',
            projectPassword:'',
            userEntity: props.user,
        }
        
        this.changeProjectNameHandler = this.changeProjectNameHandler.bind(this);
        this.changeStartDateHandler = this.changeStartDateHandler.bind(this);
        this.changeEndDateHandler = this.changeEndDateHandler.bind(this);
        this.changeProjectDescriptionHandler = this.changeProjectDescriptionHandler.bind(this);
        this.changeProjectStatusHandler = this.changeProjectStatusHandler.bind(this);
        this.changeUserIdHandler = this.changeUserIdHandler.bind(this);
        this.changeProjectPasswordHandler = this.changeProjectPasswordHandler.bind(this);
        this.saveProject = this.saveProject.bind(this);
    }

    saveProject = (e) => {
        e.preventDefault();
        let project = {
            projectId:0, projectName: this.state.projectName, projectDescription: this.state.projectDescription,
            startDate: this.state.startDate, endDate: this.state.endDate, projectStatus: this.state.projectStatus ,
            projectPassword:this.state.projectPassword ,  userEntity: this.state.userEntity
        };
        console.log(JSON.stringify(project));
       ProjectService.createProject(project).then(res => {
                if(res.data!==null){    
                        alert("Added project");}
                else{
                        alert("Something went wrong :(");
                }
        })
    }

    cancel() {
        this.props.history.push('/');
    }
    
    changeProjectNameHandler = (event) => {
        this.setState({ projectName: event.target.value });
    }
  
    changeStartDateHandler = (event) => {
        this.setState({ startDate: event.target.value });
    }

    changeEndDateHandler = (event) => {
        this.setState({ endDate: event.target.value });
    }
    changeProjectDescriptionHandler = (event) => {
        this.setState({ projectDescription: event.target.value });
    }

    changeProjectStatusHandler = (event) => {
        this.setState({projectStatus: event.target.value });
    }
    changeProjectPasswordHandler = (event) => {
        this.setState({projectPassword: event.target.value });
    }
    changeUserIdHandler = (event) => {
        this.setState({ userId: event.target.value });
    }



    render() {
        return (
            <div style={{width: '100%'}}>
                <div className="container card-view">
                    <div className="row" style={{margin: 'auto'}}>
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center mt-4">Add Project</h3>
                            <div className="card-body">
                                <form>
                                
                                    <div className="form-group">
                                        <label>Enter Project Name</label>
                                        <input placeholder="Project Name" name="projectName"
                                            className="form-control" value={this.state.projectName}
                                            onChange={this.changeProjectNameHandler} />
                                    </div>
                        
                                    <div className="form-group">
                                        <label>Enter Satrt Date</label>
                                        <input  type ="Date"placeholder="Start date" name="startDate"
                                            className="form-control" value={this.state.startDate}
                                            onChange={this.changeStartDateHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Enter End Date </label>
                                        <input type ="Date" placeholder="End Date" name="endDate"
                                            className="form-control" value={this.state.endDate}
                                            onChange={this.changeEndDateHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label>Enter Project Description  </label>
                                        <input placeholder="Project Description" name="projectDescription"
                                            className="form-control" value={this.state.projectDescription}
                                            onChange={this.changeProjectDescriptionHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Enter Project status  </label>
                                        <input placeholder="Project status" name="projectSattus"
                                            className="form-control" value={this.state.projectStatus}
                                            onChange={this.changeProjectStatusHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Enter Project password  </label>
                                        <input placeholder="project password" name="project password"
                                            className="form-control" value={this.state.projectPassword}
                                            onChange={this.changeProjectPasswordHandler} />
                                    </div>
                                    {/* <div className="form-group">
                                        <label>Enter UserId  </label>
                                        <input placeholder="userId" name="userId"
                                            className="form-control" value={this.state.user?this.state.user.userId:null}
                                            onChange={this.changeUserIdHandler} />
                                    </div> */}
                                    <button className="btn btn-success" onClick={this.saveProject}>Save</button>
                                    <a className="btn btn-danger" href="#projects" style={{ marginLeft: "10px" }}>Cancel</a>
                                </form>
                            </div>
                        </div>
                    </div>
                        <br></br>
                </div>
            </div>
        );
    }
}



export default AddProject;