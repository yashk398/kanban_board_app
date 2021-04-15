import React, {Component} from 'react';
import TaskService from '../actions/TaskService';
import {Table, Button, Modal, Form} from 'react-bootstrap';
import TeamLeadService from '../actions/TeamLeadService';

export default class TasksForLeader extends React.Component{

        constructor(props){
                super(props);
                this.state={
                        project: this.props.project,
                        tasks: [],
                        members: [],
                        show: false,
                        taskTitle: null,
                        taskStatus: 'todo',
                        teamMember: null,
                        org: null,
                        pass: null
                }

                this.handleClose = this.handleClose.bind(this);
                this.handleShow = this.handleShow.bind(this);
                this.deleteTaskById = this.deleteTaskById.bind(this);
                this.saveTask = this.saveTask.bind(this);
        }        
        
        handleClose() {
		this.setState({ show: false });
        }
        handleShow() {
                this.setState({ show: true });
        }

        async deleteTaskById(id){
                // call this method to fetch password as user types in text box
                TaskService.deleteTask(id).then((res)=>{
                        alert("Deleted "+id);
                        this.componentDidMount();
                });
        }

        async componentDidMount(){
                TaskService.fetchAllTasks().then((res)=>{
                        console.log(res.data);
                  let arr = [];
                  var i = 0;
                  for (i = 0; i < res.data.length; i++){
                    if(res.data[i].teamMemberEntity.projectEntity.projectId===this.state.project.projectId){
                      arr.push(res.data[i]);
                    }
                  }
                console.log(arr, this.state.members, res.data);
                  this.setState({ tasks : arr });
                  });  
                  
                  TeamLeadService.getAllTeamMembers(this.state.project.projectId).then((res)=>{
                        this.setState({members: res.data.membersList});
                        console.log(this.state.members);
                  });


              }

        async saveTask(e){
                        e.preventDefault();
                        const taskData = { taskId: 0, taskName: this.state.taskTitle, taskStatus: this.state.taskStatus, workStatus: 'pending', teamMemberEntity: null}
                        const fkey = this.state.teamMember;
                        console.log(this.state.teamMember);
                        if(fkey!==null && taskData.taskName!==''&&taskData.taskName!==null){
                                TaskService.addTask(taskData, fkey).then(res=>{
                                        if(res.data!==null||res.data!==undefined){
                                                alert("Added task succesfully");
                                                this.handleClose();
                                                this.componentDidMount();
                                        }
                                        else{
                                                alert("Something went wrong :(");
                                        }
                                });
                        }
                        else{
                                alert("Please check the fields");
                        }
              }

        render(){
                return(
                        <div style={{margin: 'auto'}}>
                                <Table striped bordered hover variant="light" style={{borderRadius: '1em'}}>
                                        <thead>
                                                <tr>
                                                        <td colSpan={4}><h3 style={{fontWeight: 700}}>TASKS</h3></td>
                                                        <td><Button onClick={this.handleShow}>Add Task +</Button></td>
                                                </tr>
                                                <tr>
                                                <th>#</th>
                                                <th>Task</th>
                                                <th>Team Member</th>
                                                <th>Status of task</th>
                                                <th>ACTIONS</th>
                                                </tr>
                                        </thead>
                                        <tbody>
                                        {
                                                                this.state.tasks.map(
                                                                task =>
                                                                        <tr>
                                                                                <td>{task.taskId}</td>
                                                                                <td>{task.taskName}</td>
                                                                                <td>{task.teamMemberEntity.teamMemberName}</td>
                                                                                <td>{task.taskStatus}</td>
                                                                                <td><Button variant="danger" onClick={()=>this.deleteTaskById(task.taskId)}>🗑️ Delete</Button></td>
                                                                        </tr>
                                                                )}
                                        </tbody>
                                        </Table>
                                        <Modal show={this.state.show} onHide={this.handleClose}>
                                                <Modal.Header closeButton>
                                                <Modal.Title><strong>Add a task</strong></Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                        <Form>
                                                                <Form.Group controlId="formBasicText">
                                                                                        <Form.Label>Task Title</Form.Label>
                                                                                        <Form.Control type="text" placeholder="Enter task title" value={this.state.taskTitle} onChange={(event)=>this.setState({taskTitle:  event.target.value})}/>
                                                                </Form.Group>
                                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                                        <Form.Label>Select Initial Status</Form.Label>
                                                                        <Form.Control as="select" onChange={(event)=>this.setState({taskStatus: event.target.value})}>
                                                                        <option value="todo">Todo</option>
                                                                        <option value="inprogress">In Progress</option>
                                                                        <option value="review">Review</option>
                                                                        <option value="backlog">Backlog</option>
                                                                        </Form.Control>
                                                                 </Form.Group>
                                                                 <Form.Group controlId="exampleForm.ControlSelect1">
                                                                        <Form.Label>Select Team Member</Form.Label>
                                                                        <Form.Control as="select" onChange={(event)=>this.setState({teamMember: event.target.value})}>
                                                                                        <option value={null}>--SELECT--</option>
                                                                        {
                                                                                this.state.members.map(
                                                                                member =>
                                                                                        <option value={member.teamMemberId}>{member.teamMemberName}</option>
                                                                        )}
                                                                        </Form.Control>
                                                                 </Form.Group>
                                                        </Form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                <Button variant="secondary" onClick={this.handleClose}>
                                                Close
                                                </Button>
                                                <Button variant="primary" onClick={this.saveTask}>
                                                Save Task
                                                </Button>
                                                </Modal.Footer>
                                        </Modal>
                        </div>
                );
        }
}