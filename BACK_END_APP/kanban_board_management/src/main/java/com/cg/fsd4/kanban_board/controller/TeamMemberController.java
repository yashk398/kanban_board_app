package com.cg.fsd4.kanban_board.controller;

import java.util.ArrayList;
import java.util.List;

import com.cg.fsd4.kanban_board.entity.*;
import com.cg.fsd4.kanban_board.services.WorkStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.cg.fsd4.kanban_board.response.KanbanBoardResponse;
import com.cg.fsd4.kanban_board.services.TeamMemberService;

@RequestMapping(path = "/api/kanban_board")
@RestController
@CrossOrigin("*")
public class TeamMemberController {

	@Autowired
	private TeamMemberService teamMemberService;

	@Autowired
	private WorkStatusService workStatusService;

	@PutMapping(path = "/viewWorkStatus/{teamMemberId}" , produces = MediaType.APPLICATION_JSON_VALUE)
	public KanbanBoardResponse viewWorkStatus(@PathVariable Integer teamMemberId) {
		List<TasksEntity> teamMember = workStatusService.getTask();
		KanbanBoardResponse kanbanBoardResponse = new KanbanBoardResponse();
		float totalTasks=0;
		float completedTasks=0;
		for(TasksEntity onebyone : teamMember) {
			if(onebyone.getTeamMemberEntity().getTeamMemberId() == teamMemberId) {
				totalTasks++;
				if(onebyone.getTaskStatus().equals("done")) {
					completedTasks++;
				}
			}
		}

		int workStatus = (int)((completedTasks/totalTasks)*100);
		System.out.println(workStatus);

		List<TeamMemberEntity> teamMembers = teamMemberService.getTeamMembers();
		System.out.println(teamMembers.isEmpty());
		for (TeamMemberEntity onebyone : teamMembers) {
			if (onebyone.getTeamMemberId() == teamMemberId) {
				System.out.println(onebyone.getTeamMemberId());
				System.out.println(onebyone.getWorkStatus());
				onebyone.setWorkStatus(workStatus);
				kanbanBoardResponse.setTeamMemberEntity(onebyone);
				System.out.println(onebyone.getWorkStatus());
				System.out.println(kanbanBoardResponse.getTeamMemberEntity().getWorkStatus());
			}
		}
		teamMemberService.viewWorkStatus(teamMemberId, workStatus);
		return kanbanBoardResponse;
	}


	@GetMapping(path = "/viewProjectDetails/{projectId}",  produces = MediaType.APPLICATION_JSON_VALUE)
	public ProjectEntity viewProjectDetails(@PathVariable Integer projectId) {
//		ProjectEntity projectEntity = teamMemberService.getProjectDetails(projectId);
//		KanbanBoardResponse kanbanBoardResponse = new KanbanBoardResponse();
//		if(projectEntity == null) {
//			kanbanBoardResponse.setMessage("details found");
//			kanbanBoardResponse.setProjectEntity(projectEntity);
//		}else {
//			kanbanBoardResponse.setMessage("details not found");
//		}
		return teamMemberService.getProjectDetails(projectId);
	}

	@GetMapping(path = "/getUser/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public KanbanBoardResponse getUser(@PathVariable Integer projectId) {
		List<ProjectEntity> project = teamMemberService.getUser();
		UserEntity user;
		KanbanBoardResponse kanbanBoardResponse = new KanbanBoardResponse();

		for (ProjectEntity onebyone : project) {
			if (onebyone.getProjectId() == projectId) {
				user = onebyone.getUserEntity();
				kanbanBoardResponse.setUserEntity(user);
				kanbanBoardResponse.setMessage("user details found");
				return kanbanBoardResponse;
			}
		}

		kanbanBoardResponse.setMessage("user details not found");
		return kanbanBoardResponse;
	}

	@GetMapping(path = "/getTeamLead/{projectId}",produces = MediaType.APPLICATION_JSON_VALUE)
	public KanbanBoardResponse getTeamLead(@PathVariable Integer projectId) {
		List<TeamLeadEntity> teamLead = teamMemberService.getTeamLead();
		KanbanBoardResponse kanbanBoardResponse = new KanbanBoardResponse();

		for (TeamLeadEntity onebyone : teamLead) {
			if (onebyone.getProjectEntity().getProjectId() == projectId) {
				kanbanBoardResponse.setTeamLeadEntity(onebyone);
				kanbanBoardResponse.setMessage("Team lead details found");
				return kanbanBoardResponse;
			}
		}
		kanbanBoardResponse.setMessage("No Team lead found");
		return kanbanBoardResponse;
	}

	@GetMapping(path = "/getTeamMembers/{projectId}",produces = MediaType.APPLICATION_JSON_VALUE)
	public KanbanBoardResponse getTeamMembers(@PathVariable Integer projectId) {

		List<TeamMemberEntity> teamMembers = teamMemberService.getTeamMembers();
		KanbanBoardResponse kanbanBoardResponse = new KanbanBoardResponse();
		List<TeamMemberEntity> list = new ArrayList<TeamMemberEntity>();
		for (TeamMemberEntity onebyone : teamMembers) {
			if (onebyone.getProjectEntity().getProjectId() == projectId) {
				list.add(onebyone);
			}
		}

		kanbanBoardResponse.setMembersList(list);
		return kanbanBoardResponse;
	}

}
