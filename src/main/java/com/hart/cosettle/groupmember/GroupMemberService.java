package com.hart.cosettle.groupmember;

import com.hart.cosettle.groupmember.dto.GroupMemberDto;
import com.hart.cosettle.groupmember.dto.InviteDto;
import com.hart.cosettle.groupmember.dto.JoinedGroupDto;
import com.hart.cosettle.groupmember.dto.PaginationDto;
import com.hart.cosettle.groupmember.request.CreateGroupMemberInviteRequest;
import com.hart.cosettle.advice.NotFoundException;
import com.hart.cosettle.group.Group;
import com.hart.cosettle.group.GroupService;
import com.hart.cosettle.advice.ForbiddenException;
import com.hart.cosettle.user.User;
import com.hart.cosettle.user.UserService;
import com.hart.cosettle.util.MyUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class GroupMemberService {

    private final UserService userService;
    private final GroupMemberRepository groupMemberRepository;
    private final GroupService groupService;

    @Autowired
    public GroupMemberService(
            UserService userService,
            GroupMemberRepository groupMemberRepository,
            GroupService groupService) {
        this.userService = userService;
        this.groupMemberRepository = groupMemberRepository;
        this.groupService = groupService;
    }

    public void sendGroupMemberInvite(CreateGroupMemberInviteRequest request) {
        User member = this.userService.getUserById(request.getUserId());
        User admin = this.userService.getUserById(request.getAdminId());
        Group group = this.groupService.getGroupById(request.getGroupId());
        this.groupMemberRepository.save(new GroupMember(group, member, admin, false, true));
    }

    public boolean checkIfGroupMember(Long userId, Long groupId) {
        return this.groupMemberRepository.checkIfGroupMember(userId, groupId);
    }

    private GroupMember getGroupMember(Long id) {
        return this.groupMemberRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Cannot find group member"));
    }

    private Boolean canEditGroupMember(GroupMember groupMember) {
        User user = this.userService.getCurrentlyLoggedInUser();
        if (user.getId() != groupMember.getMember().getId()) {
            return false;
        }
        return true;
    }

    public void deleteGroupMember(Long id) {
        if (!canEditGroupMember(getGroupMember(id))) {
            throw new ForbiddenException("Not allowed to edit another group member");
        }
        this.groupMemberRepository.deleteById(id);
    }

    public void updateGroupMember(Long id, Boolean accepted) {
        GroupMember groupMember = getGroupMember(id);

        if (!canEditGroupMember(groupMember)) {
            throw new ForbiddenException("Not allowed to edit another group member");
        }

        groupMember.setAccepted(accepted);

        this.groupMemberRepository.save(groupMember);
    }

    public PaginationDto<JoinedGroupDto> getJoinedGroups(Long userId, int page, int pageSize, String direction) {
        int currentPage = MyUtils.paginate(page, direction);
        Pageable paging = PageRequest.of(currentPage, pageSize, Sort.by("id").descending());
        Page<JoinedGroupDto> result = this.groupMemberRepository.getJoinedGroups(userId, paging);

        return new PaginationDto<JoinedGroupDto>(result.getContent(), currentPage, pageSize, result.getTotalPages(),
                direction);
    }

    public PaginationDto<InviteDto> getInvites(Long userId, int page, int pageSize, String direction) {
        int currentPage = MyUtils.paginate(page, direction);
        Pageable paging = PageRequest.of(currentPage, pageSize, Sort.by("id").descending());
        Page<InviteDto> result = this.groupMemberRepository.getInvites(userId, paging);

        return new PaginationDto<InviteDto>(result.getContent(), currentPage, pageSize, result.getTotalPages(),
                direction);
    }

    public PaginationDto<GroupMemberDto> getGroupMembers(Long groupId, int page, int pageSize, String direction) {
        int currentPage = MyUtils.paginate(page, direction);
        Pageable paging = PageRequest.of(currentPage, pageSize, Sort.by("id").descending());
        Page<GroupMemberDto> result = this.groupMemberRepository.getGroupMembers(groupId, paging);

        return new PaginationDto<GroupMemberDto>(result.getContent(), currentPage, pageSize, result.getTotalPages(),
                direction);

    }
}
