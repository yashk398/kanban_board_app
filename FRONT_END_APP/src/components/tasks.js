import '../App.css'
import React from 'react' 
import { Component } from 'react'
import { Container } from'react-bootstrap'
import { DragDropContext, DropTarget, DragSource } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";
import TaskService from '../actions/TaskService';

const tasks = [
      ];
      
      const labels = ["backlog", "todo", "inprogress", "review", "done"];
      const labelsMap = {
        backlog: "Backlog",
        todo: "To Do",
        inprogress: "In Progress",
        review: "Review",
        done: "Done",
      };

const classes = {
        board: {
          display: "flex",
          margin: "0 auto",
          width: "90vw",
          height: "90%",
        },
        column: {
          minWidth: 200,
          width: "18vw",
          height: "100%",
          margin: "0 auto",
          backgroundColor: "rgba(15,15,15,0.8)",
        },
        columnHead: {
          textAlign: "center",
          padding: 10,
          fontSize: "1.2em",
          backgroundColor: "#1580CF",
          color: "white",
        },
        item: {
        borderRadius: "1em",
          padding: 10,
          margin: 10,
          fontSize: "0.8em",
          cursor: "pointer",
          backgroundColor: "white",
        },
      };

class Tasks  extends Component{
        constructor(props){
                super(props);
                this.state = {
                        tasks,
                        user: this.props.user
                }
        }
        update = (id, taskStatus) => {
                const { tasks } = this.state;
                const task = tasks.find((task) => task.taskId === id);
                // console.log("task", task);
                task.taskStatus = taskStatus;
                const fkey = task.teamMemberEntity.teamMemberId;
                delete task.teamMemberEntity.projectEntity.teamLeadList;
                console.log(task, fkey);
                TaskService.updateTask(task, fkey).then((res)=>{
                  console.log(res.data);
                  if(res.data===null){
                    console.log("Something went wrong....");
                  }
                  }); 
                const taskIndex = tasks.indexOf(task);
                const newTasks = update(tasks, {
                  [taskIndex]: { $set: task },
                });
                console.log("newTask", newTasks);
                this.setState({ tasks: newTasks });
          };
        async componentDidMount(){
          TaskService.fetchAllTasks().then((res)=>{
            let arr = [];
            var i = 0;
            for (i = 0; i < res.data.length; i++){
              if(res.data[i].teamMemberEntity.teamMemberId===this.state.user.teamMemberId){
                arr.push(res.data[i]);
              }
            }
            this.setState({ tasks : arr });
            console.log(res.data, arr, this.state.user.id);
            this.forceUpdate();
            }); 
        }
        render(){
                const { tasks } = this.state;
                return(
                        <main className="board-custom" style={{margin:'auto'}}>
                                <section style={classes.board} id="board">
                                {labels.map((channel) => (
                                <KanbanColumn taskStatus={channel}>
                                <div style={classes.column} id="task-col">
                                        <div style={classes.columnHead}>{labelsMap[channel]}</div>
                                        <div>
                                        {tasks
                                        .filter((item) => item.taskStatus === channel)
                                        .map((item) => (
                                        <KanbanItem id={item.taskId} onDrop={this.update}>
                                                <div style={classes.item}>{item.taskName}</div>
                                        </KanbanItem>
                                        ))}
                                        </div>
                                        <br></br>
                                </div>
                                </KanbanColumn>
                                ))}
                                </section>
                        </main>
                );
        }
}
export default DragDropContext(HTML5Backend)(Tasks);

const boxTarget = {
        drop(props) {
          return { name: props.taskStatus };
        },
      };
      
      class KanbanColumn extends React.Component {
        render() {
          return this.props.connectDropTarget(<div>{this.props.children}</div>);
        }
      }
      
      KanbanColumn = DropTarget("kanbanItem", boxTarget, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }))(KanbanColumn);
      
      // Item
      
      const boxSource = {
        beginDrag(props) {
          return {
            name: props.id,
          };
        },
      
        endDrag(props, monitor) {
          const item = monitor.getItem();
          const dropResult = monitor.getDropResult();
          if (dropResult) {
            props.onDrop(monitor.getItem().name, dropResult.name);
          }
        },
      };
      
      class KanbanItem extends React.Component {
        render() {
          return this.props.connectDragSource(<div>{this.props.children}</div>);
        }
      }
      
      KanbanItem = DragSource("kanbanItem", boxSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
      }))(KanbanItem);