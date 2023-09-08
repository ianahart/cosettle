package com.hart.cosettle.group;

import com.hart.cosettle.group.request.CreateGroupRequest;
import com.hart.cosettle.user.User;
import com.hart.cosettle.user.UserService;

import java.util.List;
import java.util.ArrayList;

import com.hart.cosettle.advice.BadRequestException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupService {

    private final GroupRepository groupRepository;
    private final UserService userService;

    @Autowired
    public GroupService(GroupRepository groupRepository, UserService userService) {
        this.groupRepository = groupRepository;
        this.userService = userService;

    }

    public User getAdmin(Long adminId) {
        return this.userService.getUserById(adminId);
    }

    private List<Group> packageNewGroups(CreateGroupRequest request) {
        List<Group> groups = new ArrayList<>();

        for (User user : this.userService.getUserByIds(request.getUserIds())) {
            if (!this.groupRepository.checkIfUserInGroupAlready(request.getAdminId(), user.getId(),
                    request.getGroupName())) {
                groups.add(new Group(getAdmin(
                        request.getAdminId()),
                        user,
                        request.getGroupName(),
                        request.getPrivacy(),
                        false, true));

            }
        }
        return groups;
    }

    public void createGroup(CreateGroupRequest request) {
        if (request.getGroupName().length() > 150 || request.getGroupName().length() == 0) {
            throw new BadRequestException("Group name cannot exceed 150 characters and cannot be empty");
        }
        List<Group> newGroups = packageNewGroups(request);
        this.groupRepository.saveAll(newGroups);
    }
}
