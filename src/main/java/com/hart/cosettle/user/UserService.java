package com.hart.cosettle.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.hart.cosettle.advice.NotFoundException;
import com.hart.cosettle.passwordreset.PasswordResetService;
import com.hart.cosettle.passwordreset.request.PasswordResetRequest;
import com.hart.cosettle.user.dto.ChatUserDto;
import com.hart.cosettle.user.dto.SearchUserDto;
import com.hart.cosettle.user.dto.UserDto;
import com.hart.cosettle.user.dto.UserPaginationDto;
import com.hart.cosettle.user.request.ChangePasswordUserRequest;
import com.hart.cosettle.util.MyUtils;

import java.security.Key;

import com.hart.cosettle.advice.BadRequestException;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class UserService {

    @Value("${secretkey}")
    private String secretKey;

    private final UserRepository userRepository;
    private final PasswordResetService passwordResetService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository,
            PasswordResetService passwordResetService,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordResetService = passwordResetService;
        this.passwordEncoder = passwordEncoder;

    }

    public ChatUserDto getUser(Long userId) {
        if (userId == null) {
            throw new BadRequestException("User id missing in request");
        }
        return this.userRepository.getUser(userId);
    }

    public UserPaginationDto searchUsers(Long userId, String direction, int page, int pageSize, String term) {
        int currentPage = MyUtils.paginate(page, direction);
        Pageable paging = PageRequest.of(currentPage, pageSize, Sort.by("id").descending());
        Page<SearchUserDto> results = this.userRepository.searchUsers(userId, term, paging);

        return new UserPaginationDto(
                results.getContent(),
                currentPage,
                pageSize,
                results.getTotalPages(),
                direction);
    }

    public User getUserByEmail(String email) {
        return this.userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    public User getUserById(Long userId) {
        return this.userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    public void passwordReset(PasswordResetRequest request) {
        User user = this.getUserById(request.getId());
        if (this.passwordResetService.checkPasswordResetExpired(request.getToken())) {
            throw new BadRequestException("The reset link has expired");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("The passwords do not match");
        }

        user.setPassword(this.passwordEncoder.encode(request.getNewPassword()));

        this.userRepository.save(user);
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Claims extractUserIdFromToken(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

    }

    public UserDto getUserByToken(String token) {
        Claims claims = extractUserIdFromToken(token);

        User user = getUserByEmail(claims.getSubject());
        UserDto userDto = new UserDto(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole(),
                user.getAbbreviation(),
                user.getLoggedIn(),
                user.getProfile().getId(),
                user.getProfile().getAvatarUrl(),
                user.getTheme().getTheme(),
                user.getTheme().getId());
        return userDto;

    }

    public User getCurrentlyLoggedInUser() {
        Object principal = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        String username = ((UserDetails) principal).getUsername();
        User user = this.userRepository.findByEmail(username)
                .orElseThrow(() -> new NotFoundException("Current user was not found"));
        return user;
    }

    public void changePassword(ChangePasswordUserRequest request) {
        User user = getUserById(request.getUserId());

        if (!this.passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new BadRequestException("Your current password is incorrect");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Passwords do not match");
        }

        if (!MyUtils.validatePassword(request.getNewPassword())) {

            throw new BadRequestException(
                    "Password must contain 1 lowercase, 1 uppercase, 1 digit, and 1 special character");
        }

        user.setPassword(this.passwordEncoder.encode(request.getNewPassword()));

        this.userRepository.save(user);
        ;

    }
}
