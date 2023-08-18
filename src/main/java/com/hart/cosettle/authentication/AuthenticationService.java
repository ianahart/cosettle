package com.hart.cosettle.authentication;

import java.util.Optional;
import java.util.List;

import com.hart.cosettle.advice.BadRequestException;
import com.hart.cosettle.advice.ForbiddenException;
import com.hart.cosettle.advice.NotFoundException;
import com.hart.cosettle.authentication.request.LoginRequest;
import com.hart.cosettle.authentication.request.RegisterRequest;
import com.hart.cosettle.authentication.response.LoginResponse;
import com.hart.cosettle.authentication.response.RegisterResponse;
import com.hart.cosettle.config.JwtService;
import com.hart.cosettle.profile.ProfileService;
import com.hart.cosettle.token.Token;
import com.hart.cosettle.token.TokenRepository;
import com.hart.cosettle.token.TokenType;
import com.hart.cosettle.user.Role;
import com.hart.cosettle.user.User;
import com.hart.cosettle.user.UserRepository;
import com.hart.cosettle.user.dto.UserDto;
import com.hart.cosettle.util.MyUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final ProfileService profileService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;

    @Autowired
    public AuthenticationService(
            PasswordEncoder passwordEncoder,
            ProfileService profileService,
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            TokenRepository tokenRepository) {
        this.passwordEncoder = passwordEncoder;
        this.profileService = profileService;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
    }

    public RegisterResponse register(RegisterRequest request) {
        User user = new User(
                MyUtils.capitalize(request.getFirstName()),
                MyUtils.capitalize(request.getLastName()),
                request.getEmail(),
                this.passwordEncoder.encode(request.getPassword()),
                false,
                request.getRole().equals("USER") ? Role.USER : Role.ADMIN,
                this.profileService.createProfile());

        Optional<User> exists = this.userRepository.findByEmail(request.getEmail());

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Passwords do not match");
        }
        if (exists.isPresent()) {
            throw new BadRequestException("A user with that email already exists.");
        }
        this.userRepository.save(user);

        return new RegisterResponse("User created.");
    }

    public void revokeAllUserTokens(User user) {
        List<Token> tokens = this.tokenRepository.findAllValidTokens(user.getId());

        if (tokens.isEmpty()) {
            return;
        }

        tokens.forEach(t -> {
            t.setExpired(true);
            t.setRevoked(true);
        });

        this.tokenRepository.saveAll(tokens);
    }

    public LoginResponse login(LoginRequest request) {

        try {
            this.authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()));

        } catch (BadCredentialsException e) {
            throw new ForbiddenException("Credentials are invalid");
        }
        User user = this.userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new NotFoundException("User not found by email."));

        String jwtToken = this.jwtService.generateToken(user);

        this.revokeAllUserTokens(user);
        user.setLoggedIn(true);

        this.userRepository.save(user);
        this.saveTokenWithUser(jwtToken, user);

        UserDto userDto = new UserDto(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole(),
                user.getAbbreviation(),
                user.getLoggedIn(),
                user.getProfile().getId());

        return new LoginResponse(userDto, jwtToken, "");
    }

    public void saveTokenWithUser(String token, User user) {
        Token tokenToSave = new Token(token, TokenType.BEARER, false, false, user);
        this.tokenRepository.save(tokenToSave);

    }

}
