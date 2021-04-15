package com.cg.fsd4.kanban_board.services;

import java.util.List;

import javax.transaction.Transactional;

import com.cg.fsd4.kanban_board.entity.*;
import com.cg.fsd4.kanban_board.response.KanbanBoardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import com.cg.fsd4.kanban_board.repo.ProjectRepo;
import com.cg.fsd4.kanban_board.repo.TeamLeadRepo;
import com.cg.fsd4.kanban_board.repo.TeamMemberRepo;
import com.cg.fsd4.kanban_board.repo.UserRepo;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@Service
@Transactional
public class TeamMemberServiceImpl implements TeamMemberService {
	
	@Autowired
	private ProjectRepo projectRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private TeamLeadRepo teamLeadRepo;
	
	@Autowired
	private TeamMemberRepo teamMemberRepo;

	@Autowired
	private WorkStatusService workStatusService;

	@Autowired
	private TeamMemberService teamMemberService;

	@Override
	public ProjectEntity getProjectDetails(Integer projectId) {
		
		return projectRepo.findById(projectId).get();
	}
	
	@Override
	public List<ProjectEntity> getUser() {
		
		return projectRepo.findAll();
	}

	@Override
	public List<TeamLeadEntity> getTeamLead() {

		return teamLeadRepo.findAll();
	}

	@Override
	public List<TeamMemberEntity> getTeamMembers() {

		return teamMemberRepo.findAll();
	}

	@Override
	public TeamMemberEntity viewWorkStatus(Integer teamMemberId, Integer workStatus) {

		TeamMemberEntity teamMemberEntity = teamMemberRepo.findById(teamMemberId).get();
		teamMemberEntity.setWorkStatus(workStatus);
		return teamMemberRepo.save(teamMemberEntity);
	}

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
		System.out.println(totalTasks);

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

}
