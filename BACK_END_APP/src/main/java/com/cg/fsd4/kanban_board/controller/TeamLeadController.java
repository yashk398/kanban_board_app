package com.cg.fsd4.kanban_board.controller;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.cg.fsd4.kanban_board.entity.ProjectEntity;
import com.cg.fsd4.kanban_board.entity.TeamLeadEntity;
import com.cg.fsd4.kanban_board.entity.TeamMemberEntity;
import com.cg.fsd4.kanban_board.exception.TeamLeadNotFoundException;
import com.cg.fsd4.kanban_board.response.KanbanBoardResponse;
import com.cg.fsd4.kanban_board.services.TeamLeadService;

@RestController
@RequestMapping("/api/kanban_board")

@ComponentScan
@CrossOrigin("*")
public class TeamLeadController {
	@Autowired
	TeamLeadService teamLeadService;

	/*
	 * For saving team lead for my purpose
	 */
	// http://localhost:8080/kanban/
//	@PostMapping("/")

/*
 * Get all teamLead for my purpose
 */
	@GetMapping("/")
	public ResponseEntity<List<TeamLeadEntity>> GetAllTeamLead() {
		try {
			List<TeamLeadEntity> teamleadList = teamLeadService.viewTeamLead();
			return new ResponseEntity<>(teamleadList, HttpStatus.OK);
		}
		catch (TeamLeadNotFoundException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

	/*
	 * Login of team Lead
	 */
	//http://localhost:8080/kanban//teamLeadLogin/{201}/{KanBan@12}
		@GetMapping(path = "/teamLeadLogin/{employeeId}/{projectPassword}"/*, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE*/)
		public TeamLeadEntity teamMemberLogin(@PathVariable Long employeeId, @PathVariable String projectPassword) {
			List<TeamLeadEntity> teamLeadList = teamLeadService.getAllTeamLead();
			KanbanBoardResponse kanbanBoardResponse = new KanbanBoardResponse();
			TeamLeadEntity TeamLead = new TeamLeadEntity();
			int count=0;
			for(TeamLeadEntity onebyone : teamLeadList) {
				if(onebyone.getEmployeeId() == employeeId && onebyone.getProjectPassword().equals(projectPassword)) {
					TeamLead=onebyone;
				}
			}
			return TeamLead;
		}
	/*
	 * Get project details by TeamLeadId (My module)
	 */
	@GetMapping("/teamlead/{id}")
	public ResponseEntity<TeamLeadEntity> GetTeamLead(@PathVariable int id) {
		try {
			TeamLeadEntity teamlead = teamLeadService.viewTeamLeadById(id);
			return new ResponseEntity<>(teamlead, HttpStatus.OK);
		}
		catch (TeamLeadNotFoundException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	

	/*
	 * Update project status (My Module)
	 */
	@GetMapping(value = "/updatestatus")
	// http://localhost:8080/kanban/updatestatus?projectStatus="Project Done"&projectId=20
	public ProjectEntity updateStatus(@RequestParam("projectStatus") String projectStatus,
			@RequestParam("projectId") int projectId) throws Exception {
		try
		{
			return teamLeadService.UpdateStatus(projectStatus, projectId);
		}
		catch (TeamLeadNotFoundException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	/*
	 * Get team members by project id (My Module)
	 */
	@GetMapping(path = "/getteammembers")
	public KanbanBoardResponse getTeamMembers(int projectId)
	{

		try
		{
			List<TeamMemberEntity> teamMembers = teamLeadService.getTeamMembers();
			KanbanBoardResponse kanbanBoardResponse = new KanbanBoardResponse();
			
			List<TeamMemberEntity> list=new ArrayList<TeamMemberEntity>();
			for(TeamMemberEntity onebyone : teamMembers)
			{
				//System.out.println(onebyone.getProjectEntity());
				if(onebyone.getProjectEntity().getProjectId()==projectId)
				{
					list.add(onebyone);
				}
			}
			kanbanBoardResponse.setMembersList(list);
			return kanbanBoardResponse;
		}
		catch (TeamLeadNotFoundException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	

}
