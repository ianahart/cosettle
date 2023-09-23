package com.hart.cosettle.group;

import com.hart.cosettle.group.dto.GroupDto;
import com.hart.cosettle.group.dto.GroupPaginationDto;
import com.hart.cosettle.group.dto.GroupWithMemberDto;
import com.hart.cosettle.group.request.CreateGroupRequest;
import com.hart.cosettle.groupmember.GroupMember;
import com.hart.cosettle.groupmember.GroupMemberRepository;
import com.hart.cosettle.user.User;
import com.hart.cosettle.user.UserService;
import com.hart.cosettle.util.MyUtils;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import com.hart.cosettle.advice.BadRequestException;
import com.hart.cosettle.advice.NotFoundException;
import com.hart.cosettle.amazon.AmazonService;
import com.hart.cosettle.advice.ForbiddenException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class GroupService {

    private final GroupRepository groupRepository;
    private final UserService userService;
    private final GroupMemberRepository groupMemberRepository;
    private final AmazonService amazonService;
    private final String BUCKET_NAME = "arrow-date/cosettle/backgrounds";
    private final int MAX_MEGA_BYTES = 2;

    @Autowired
    public GroupService(GroupRepository groupRepository,
            UserService userService,
            GroupMemberRepository groupMemberRepository,
            AmazonService amazonService) {
        this.groupRepository = groupRepository;
        this.userService = userService;
        this.groupMemberRepository = groupMemberRepository;
        this.amazonService = amazonService;

    }

    public Long getAdminByGroupId(Long groupId) {

        return this.groupRepository.getAdminByGroupId(groupId);
    }

    private boolean validateImageSize(MultipartFile image) {
        return image.getSize() > MAX_MEGA_BYTES * 1024 * 1024;
    }

    public String uploadGroupImage(Long groupId, MultipartFile file) {

        if (validateImageSize(file)) {
            throw new BadRequestException("Image cannot exceed " + MAX_MEGA_BYTES + "MB");
        }

        Group group = getGroupById(groupId);
        if (group.getFilename() != null) {
            this.amazonService.delete(BUCKET_NAME, group.getFilename());
        }

        String filename = this.amazonService.upload(BUCKET_NAME, file.getOriginalFilename(), file);
        Map<String, String> contents = this.amazonService.getPublicUrl(BUCKET_NAME, filename);

        group.setUrl(contents.get("url"));
        group.setFilename(contents.get("filename"));
        Group updatedGroup = this.groupRepository.save(group);

        return updatedGroup.getUrl();
    }

    public User getAdmin(Long adminId) {
        return this.userService.getUserById(adminId);
    }

    public Group getGroupById(Long groupId) {
        return this.groupRepository.findById(groupId)
                .orElseThrow(() -> new NotFoundException("Group not found"));
    }

    private boolean checkIsGroupMemberOrAdmin(User user, Group group) {
        List<Long> groupMemberIds = group.getGroupMembers()
                .stream().filter(gm -> gm.getAccepted())
                .map(gm -> gm.getMember().getId()).toList();

        return groupMemberIds.contains(user.getId()) || user.getId() == group.getAdmin().getId() ? true : false;
    }

    public GroupWithMemberDto getGroup(Long groupId) {
        Group groupEntity = getGroupById(groupId);
        User user = this.userService.getCurrentlyLoggedInUser();

        boolean isGroupMemberOrAdmin = checkIsGroupMemberOrAdmin(user, groupEntity);

        return new GroupWithMemberDto(isGroupMemberOrAdmin, this.groupRepository.getGroup(groupId));
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

    public GroupPaginationDto<GroupDto> getSearchGroups(String searchTerm, int page, int pageSize, String direction) {
        int currentPage = MyUtils.paginate(page, direction);
        Pageable paging = PageRequest.of(currentPage, pageSize, Sort.by("id").descending());
        Page<GroupDto> searchGroups = this.groupRepository.getSearchGroups(searchTerm.toLowerCase(), paging);

        return new GroupPaginationDto<GroupDto>(
                searchGroups.getContent(),
                currentPage,
                pageSize,
                searchGroups.getTotalPages(),
                direction);

    }

    public void updateGroup(Long id, String name) {
        User user = this.userService.getCurrentlyLoggedInUser();
        Group group = getGroupById(id);
        if (user.getId() != group.getAdmin().getId()) {
            throw new ForbiddenException("Do not have necessary priveleges to update a group");
        }

        group.setName(name);
        this.groupRepository.save(group);
    }
}
