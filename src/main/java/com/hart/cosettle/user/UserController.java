package com.hart.cosettle.user;

import com.hart.cosettle.user.dto.UserDto;
import com.hart.cosettle.user.request.ChangePasswordUserRequest;
import com.hart.cosettle.user.response.ChangePasswordUserResponse;
import com.hart.cosettle.advice.NotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
}
