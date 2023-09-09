package com.hart.cosettle.group;

import com.hart.cosettle.group.request.CreateGroupRequest;
import com.hart.cosettle.group.response.CreateGroupResponse;
import com.hart.cosettle.group.response.GetAdminGroupsResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/groups")
public class GroupController {

    private final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping("/admin")
    public ResponseEntity<GetAdminGroupsResponse> getAdminGroups(
            @RequestParam("adminId") Long adminId,
            @RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize,
            @RequestParam("direction") String direction) {

        return ResponseEntity.status(HttpStatus.OK).body(new GetAdminGroupsResponse("success",
                this.groupService.getAdminGroups(adminId, page, pageSize, direction)));
    }

    @PostMapping("")
    public ResponseEntity<CreateGroupResponse> createGroup(@RequestBody CreateGroupRequest request) {
        this.groupService.createGroup(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new CreateGroupResponse("success"));
    }

}
