package com.hart.cosettle.authentication;

import java.io.IOException;

import com.hart.cosettle.authentication.request.LoginRequest;
import com.hart.cosettle.authentication.request.RegisterRequest;
import com.hart.cosettle.authentication.response.LoginResponse;
import com.hart.cosettle.authentication.response.RegisterResponse;
import com.hart.cosettle.config.JwtService;
import com.hart.cosettle.email.EmailService;
import com.hart.cosettle.email.request.ForgotPasswordEmailRequest;
import com.hart.cosettle.email.response.ForgotPasswordEmailResponse;
import com.hart.cosettle.passwordreset.PasswordResetService;
import com.hart.cosettle.passwordreset.request.PasswordResetRequest;
import com.hart.cosettle.passwordreset.response.PasswordResetResponse;
import com.hart.cosettle.refreshtoken.RefreshToken;
import com.hart.cosettle.refreshtoken.RefreshTokenService;
import com.hart.cosettle.refreshtoken.request.RefreshTokenRequest;
import com.hart.cosettle.refreshtoken.response.RefreshTokenResponse;
import com.hart.cosettle.user.User;
import com.hart.cosettle.user.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import freemarker.template.TemplateException;
import jakarta.mail.MessagingException;

@RestController
@RequestMapping(path = "/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final RefreshTokenService refreshTokenService;
    private final JwtService jwtService;
    private final EmailService emailService;
    private final UserService userService;
    private final PasswordResetService passwordResetService;

    public AuthenticationController(AuthenticationService authenticationService,
            RefreshTokenService refreshTokenService,
            JwtService jwtService,
            EmailService emailService,
            UserService userService,
            PasswordResetService passwordResetService) {
        this.authenticationService = authenticationService;
        this.refreshTokenService = refreshTokenService;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.userService = userService;
        this.passwordResetService = passwordResetService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request) {
        this.authenticationService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new RegisterResponse("success"));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(
                this.authenticationService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshTokenResponse> refresh(@RequestBody RefreshTokenRequest request) {
        RefreshToken refreshToken = this.refreshTokenService.verifyRefreshToken(request.getRefreshToken());

        this.authenticationService.revokeAllUserTokens(refreshToken.getUser());
        String token = this.jwtService.generateToken(refreshToken.getUser());
        this.authenticationService.saveTokenWithUser(token, refreshToken.getUser());

        return ResponseEntity.status(200).body(
                new RefreshTokenResponse(token, refreshToken.getRefreshToken()));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ForgotPasswordEmailResponse> sendEmail(@RequestBody ForgotPasswordEmailRequest request)
            throws IOException, TemplateException, MessagingException {
        User user = this.userService.getUserByEmail(request.getEmail());

        this.passwordResetService.deleteUserPasswordResetsById(user.getId());
        return ResponseEntity
                .status(200)
                .body(this.emailService.sendForgotPasswordEmail(request));

    }

    @PostMapping("/password-reset")
    public ResponseEntity<PasswordResetResponse> passwordReset(@RequestBody PasswordResetRequest request) {

         this.passwordResetService.isResetTokenValid(request.getToken());

         this.userService.passwordReset(request);

        return ResponseEntity.status(HttpStatus.OK).body(
                new PasswordResetResponse("Password has been reset"));
    }

}
