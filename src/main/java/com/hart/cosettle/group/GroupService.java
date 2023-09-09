package com.hart.cosettle.group;

import com.hart.cosettle.group.dto.GroupDto;
import com.hart.cosettle.group.dto.GroupPaginationDto;
import com.hart.cosettle.group.request.CreateGroupRequest;
import com.hart.cosettle.groupmember.GroupMember;
import com.hart.cosettle.groupmember.GroupMemberRepository;
import com.hart.cosettle.user.User;
import com.hart.cosettle.user.UserService;
import com.hart.cosettle.util.MyUtils;

import java.util.List;
import java.util.ArrayList;

import com.hart.cosettle.advice.BadRequestException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class GroupService {

    private final GroupRepository groupRepository;
    private final UserService userService;
    private final GroupMemberRepository groupMemberRepository;

    @Autowired
    public GroupService(GroupRepository groupRepository,
            UserService userService,
            GroupMemberRepository groupMemberRepository) {
        this.groupRepository = groupRepository;
        this.userService = userService;
        this.groupMemberRepository = groupMemberRepository;

    }

    public User getAdmin(Long adminId) {
        return this.userService.getUserById(adminId);
    }

    private List<GroupMember> packageNewGroupMembers(CreateGroupRequest request, Group group) {
        List<GroupMember> groupMembers = new ArrayList<>();

        for (User user : this.userService.getUserByIds(request.getUserIds())) {
            groupMembers.add(new GroupMember(group, user, getAdmin(request.getAdminId()), false, true));
        }
        return groupMembers;
    }

    public void createGroup(CreateGroupRequest request) {
        if (request.getGroupName().length() > 150 || request.getGroupName().length() == 0) {
            throw new BadRequestException("Group name cannot exceed 150 characters and cannot be empty");
        }

        if (!this.groupRepository.checkIfUserInGroupAlready(request.getAdminId(), request.getGroupName())) {
            Group group = this.groupRepository
                    .save(new Group(getAdmin(request.getAdminId()), request.getGroupName(), request.getPrivacy()));

            List<GroupMember> newGroupMembers = packageNewGroupMembers(request, group);

            this.groupMemberRepository.saveAll(newGroupMembers);

        }

    }

    public GroupPaginationDto<GroupDto> getAdminGroups(Long adminId, int page, int pageSize, String direction) {
        int currentPage = MyUtils.paginate(page, direction);
        Pageable paging = PageRequest.of(currentPage, pageSize, Sort.by("id").descending());
        Page<GroupDto> adminGroups = this.groupRepository.getAdminGroups(adminId, paging);

        return new GroupPaginationDto<GroupDto>(
                adminGroups.getContent(),
                currentPage,
                pageSize,
                adminGroups.getTotalPages(),
                direction);

    }
}
