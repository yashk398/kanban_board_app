package com.cg.fsd4.kanban_board.controller;

import com.cg.fsd4.kanban_board.entity.TasksEntity;
import com.cg.fsd4.kanban_board.repo.TasksRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ManageTaskControllerTest {
    @Autowired
    TasksRepo tr;

    @Test
    public void TestCheckNotEmptyTasks(){
        List<TasksEntity> tasksEmpty = new ArrayList<TasksEntity>();
        RestTemplate restTemplate = new RestTemplate();
        List<TasksEntity> task = restTemplate.getForObject("http://localhost:8080/kanban/tasks/", List.class);
        assertNotEquals(task, tasksEmpty);
    }
    @Test
    public void TestVerifyStatusChange(){
        TasksEntity BldCr = new TasksEntity(1, "Build the core", "review", "pending", null);
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.put("http://localhost:8080/kanban/tasks/2", BldCr);
        TasksEntity task = restTemplate.getForObject("http://localhost:8080/kanban/tasks/"+BldCr.getTaskId(), TasksEntity.class);
        assertEquals(task.getTaskStatus(), "review");
    }

}