package com.hart.cosettle.user;

import com.hart.cosettle.user.dto.UserDto;
import com.hart.cosettle.user.request.ChangePasswordUserRequest;
import com.hart.cosettle.user.response.ChangePasswordUserResponse;
import com.hart.cosettle.user.response.GetUserResponse;
import com.hart.cosettle.user.response.GetUsersResponse;
import com.hart.cosettle.user.response.SearchUserResponse;
import com.hart.cosettle.user.response.SearchUsersByNameResponse;
import com.hart.cosettle.advice.NotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(path = "/api/v1/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/search/name")
    public ResponseEntity<SearchUsersByNameResponse> searchUsersByName(
            @RequestParam("name") String name,
            @RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize,
            @RequestParam("direction") String direction,
            @RequestParam("groupId") Long groupId,
            @RequestParam("adminId") Long adminId) {

        return ResponseEntity.status(HttpStatus.OK).body(new SearchUsersByNameResponse("success",
                this.userService.searchUsersByName(name, page, pageSize, direction, groupId, adminId)));
    }

    @GetMapping("")
    public ResponseEntity<GetUsersResponse> getUsers(
            @RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize,
            @RequestParam("direction") String direction) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetUsersResponse("success", this.userService.getUsers(page, pageSize, direction)));

    }

    @GetMapping("/{userId}")
    public ResponseEntity<GetUserResponse> getUser(@PathVariable("userId") Long userId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetUserResponse("success", this.userService.getUser(userId)));
    }

    @PatchMapping("/{userId}/change-password")
    public ResponseEntity<ChangePasswordUserResponse> changePassword(@RequestBody ChangePasswordUserRequest request) {

        this.userService.changePassword(request);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ChangePasswordUserResponse("success"));

    }

    @GetMapping("/sync")
    public ResponseEntity<UserDto> syncUser(HttpServletRequest request) {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new NotFoundException("Invalid header token");
        }
        return ResponseEntity.status(200).body(this.userService.getUserByToken(authHeader.substring(7)));
    }

    @GetMapping("/search")
    public ResponseEntity<SearchUserResponse> searchUsers(
            @RequestParam("userId") Long userId,
            @RequestParam("direction") String direction,
            @RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize,
            @RequestParam("term") String term) {

        return ResponseEntity.status(HttpStatus.OK).body(new SearchUserResponse("success",
                this.userService.searchUsers(userId, direction, page, pageSize, term)));
    }
}
