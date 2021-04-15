package com.cg.fsd4.kanban_board.controller;



import com.cg.fsd4.kanban_board.entity.TasksEntity;
import com.cg.fsd4.kanban_board.exception.TaskNotFoundException;
import com.cg.fsd4.kanban_board.exception.TeamMemberNotFoundException;
import com.cg.fsd4.kanban_board.services.ManageTasksService;
import com.cg.fsd4.kanban_board.services.ManageTasksServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import javafx.concurrent.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/kanban_board")

@Api(value="Task related REST APIs")
public class ManageTaskController {
    @Autowired
    public ManageTasksService TaskService = new ManageTasksServiceImpl();

    //FETCH ALL TASKS
    @ApiOperation(value="Returns all tasks")
    @ApiResponses(value= {
            @ApiResponse(code=201, message="the tasks found"),
            @ApiResponse(code=404, message = "No tasks were found")
    })
    @GetMapping(value ="/tasks/",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<TasksEntity> fetchAllTasks() {
        return TaskService.listTasks();
    }
    @GetMapping(value ="/tasks/{id}",produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    public TasksEntity findTask(@PathVariable ("id") int pkey) throws TaskNotFoundException {
        return TaskService.findTask(pkey);
    }
    @PostMapping(value="/tasks/{id}",produces =MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<TasksEntity> addTask(@RequestBody TasksEntity task, @PathVariable ("id") int fkey) throws TeamMemberNotFoundException {
        return  TaskService.addTask(task, fkey);
    }
    @DeleteMapping(value="/tasks/{id}", produces= MediaType.APPLICATION_JSON_VALUE)
    public List<TasksEntity> deleteTask(@PathVariable ("id") int id) throws TaskNotFoundException {
        return TaskService.deleteTask(id);
    }
    @PutMapping(value="/tasks/{id}", produces= MediaType.APPLICATION_JSON_VALUE)
    public TasksEntity updateTask(@PathVariable ("id") int id, @RequestBody TasksEntity task) throws TaskNotFoundException {
        return TaskService.updateTask(id, task);
    }
}
