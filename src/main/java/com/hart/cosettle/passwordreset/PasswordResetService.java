package com.hart.cosettle.passwordreset;

import com.hart.cosettle.advice.ForbiddenException;
import com.hart.cosettle.config.JwtService;
import com.hart.cosettle.user.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;

@Service
public class PasswordResetService {
    private final PasswordResetRepository passwordResetRepository;
    private final JwtService jwtService;

    @Autowired
    public PasswordResetService(PasswordResetRepository passwordResetRepository,
            JwtService jwtService) {
        this.passwordResetRepository = passwordResetRepository;
        this.jwtService = jwtService;
    }

    public void deleteUserPasswordResetsById(Long id) {
        this.passwordResetRepository.deleteUserPasswordResetsById(id);
    }

    public void isResetTokenValid(String token) {
        this.passwordResetRepository.findByToken(token)
                .orElseThrow(() -> new ForbiddenException("Reset token is invalid."));
    }

    public void savePasswordReset(User user, String token) {
        if (token != null && user != null) {
            PasswordReset passwordReset = new PasswordReset(token, user);
            this.passwordResetRepository.save(passwordReset);

        }
    }

    public boolean checkPasswordResetExpired(String token) {
        return this.jwtService.tokenElapsedDay(token);
    }
}
