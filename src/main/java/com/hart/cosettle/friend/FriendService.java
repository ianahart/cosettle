package com.hart.cosettle.friend;

import com.hart.cosettle.friend.dto.FriendDto;
import com.hart.cosettle.friend.dto.FriendPaginationDto;
import com.hart.cosettle.friend.dto.FriendRequestDto;
import com.hart.cosettle.friend.dto.FriendRequestPaginationDto;
import com.hart.cosettle.friend.request.FriendRequestRequest;
import com.hart.cosettle.advice.NotFoundException;
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
public class FriendService {

    private final UserService userService;
    private final FriendRepository friendRepository;

    @Autowired
    public FriendService(UserService userService, FriendRepository friendRepository) {
        this.userService = userService;
        this.friendRepository = friendRepository;
    }

    public void removeFriend(Long userId, Long friendId) {
        if (this.userService.getCurrentlyLoggedInUser().getId() != userId) {
            throw new ForbiddenException("Cannot remove another person's friend");
        }

        Friend friendShipOne = this.friendRepository.getFriendShip(userId, friendId);
        Friend friendShipTwo = this.friendRepository.getFriendShip(friendId, userId);

        if (friendShipOne != null) {
            this.friendRepository.deleteById(friendShipOne.getId());

        }

        if (friendShipTwo != null) {
            this.friendRepository.deleteById(friendShipTwo.getId());

        }
    }

    private void mirrorFriendShip(Long userId, Long friendId) {
        User user = this.userService.getUserById(userId);
        User friend = this.userService.getUserById(friendId);

        this.friendRepository.save(new Friend(user, friend, true, true));
    }

    public Friend getFriendById(Long id) {
        return this.friendRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Friend not found"));
    }

    public void acceptFriendRequest(Long id, Long userId, Long friendId) {
        Friend friend = this.getFriendById(id);
        friend.setAccepted(true);
        this.friendRepository.save(friend);
        if (!negateDuplicateFriendRequest(userId, friendId) || !negateDuplicateFriendRequest(friendId, userId)) {
            mirrorFriendShip(userId, friendId);
        }
    }

    public FriendPaginationDto getFriends(Long userId, int page, int pageSize, String direction) {
        int currentPage = MyUtils.paginate(page, direction);
        Pageable paging = PageRequest.of(currentPage, pageSize, Sort.by("id").descending());
        Page<FriendDto> results = this.friendRepository.getFriends(userId, paging);

        return new FriendPaginationDto(
                results.getContent(),
                currentPage,
                pageSize,
                results.getTotalPages(),
                direction);

    }

    public FriendPaginationDto searchFriends(Long userId, String searchTerm, int page, int pageSize, String direction) {
        int currentPage = MyUtils.paginate(page, direction);
        Pageable paging = PageRequest.of(currentPage, pageSize, Sort.by("id").descending());
        Page<FriendDto> results = this.friendRepository.searchFriends(userId, searchTerm.toLowerCase(), paging);

        return new FriendPaginationDto(
                results.getContent(),
                currentPage,
                pageSize,
                results.getTotalPages(),
                direction);

    }

    public FriendRequestPaginationDto getFriendRequests(Long userId, int page, int pageSize, String direction) {
        int currentPage = MyUtils.paginate(page, direction);
        Pageable paging = PageRequest.of(currentPage, pageSize, Sort.by("id").descending());
        Page<FriendRequestDto> results = this.friendRepository.getFriendRequests(userId, paging);

        return new FriendRequestPaginationDto(
                results.getContent(),
                currentPage,
                pageSize,
                results.getTotalPages(),
                direction);

    }

    public void deleteFriendRequest(Long id) {
        if (id != null) {
            this.friendRepository.deleteById(id);
        }
    }

    public FriendRequestDto getFriendRequest(FriendRequestRequest friendRequest) {
        return this.friendRepository.getFriendRequest(friendRequest.getUserId(), friendRequest.getFriendId());
    }

    private Boolean negateDuplicateFriendRequest(Long userId, Long friendId) {
        return this.friendRepository.duplicateFriendRequest(userId, friendId);
    }

    public void createFriendRequest(FriendRequestRequest friendRequest) {
        User user = this.userService.getUserById(friendRequest.getUserId());
        User friend = this.userService.getUserById(friendRequest.getFriendId());

        if (!negateDuplicateFriendRequest(user.getId(), friend.getId())) {
            this.friendRepository.save(new Friend(user, friend, true, false));
        }
    }
}
