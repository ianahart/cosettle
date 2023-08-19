package com.hart.cosettle.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.hart.cosettle.advice.NotFoundException;
import com.hart.cosettle.passwordreset.PasswordReset;
import com.hart.cosettle.passwordreset.PasswordResetService;
import com.hart.cosettle.passwordreset.request.PasswordResetRequest;
import com.hart.cosettle.advice.BadRequestException;

import org.springframework.stereotype.Service;

@Service
public class UserService {

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
}
