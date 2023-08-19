package com.hart.cosettle.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.hart.cosettle.advice.NotFoundException;
import com.hart.cosettle.passwordreset.PasswordReset;
import com.hart.cosettle.passwordreset.PasswordResetService;
import com.hart.cosettle.passwordreset.request.PasswordResetRequest;
import com.hart.cosettle.user.dto.UserDto;

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
                user.getProfile().getId());
        return userDto;

    }
}
