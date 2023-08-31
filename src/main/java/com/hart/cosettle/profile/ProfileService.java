package com.hart.cosettle.profile;

import org.springframework.beans.factory.annotation.Autowired;
import com.hart.cosettle.advice.NotFoundException;
import com.hart.cosettle.amazon.AmazonService;
import com.hart.cosettle.advice.ForbiddenException;

import java.util.Optional;
import java.util.Map;

import com.hart.cosettle.advice.BadRequestException;
import com.hart.cosettle.profile.dto.ProfileDto;
import com.hart.cosettle.profile.dto.UpdateProfileDto;
import com.hart.cosettle.profile.request.UpdateProfileRequest;
import com.hart.cosettle.profile.request.UploadProfilePhotoRequest;
import com.hart.cosettle.user.User;
import com.hart.cosettle.user.UserRepository;
import com.hart.cosettle.user.UserService;
import com.hart.cosettle.util.MyUtils;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProfileService {
    private final int MAX_MEGA_BYTES = 2;
    private final String bucketName = "arrow-date/cosettle/avatars";

    private final ProfileRepository profileRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    private final AmazonService amazonService;

    @Autowired
    public ProfileService(ProfileRepository profileRepository,
            UserService userService,
            UserRepository userRepository,
            AmazonService amazonService) {
        this.profileRepository = profileRepository;
        this.userService = userService;
        this.userRepository = userRepository;
        this.amazonService = amazonService;
    }

    public Profile createProfile() {
        Profile profile = new Profile();
        return this.profileRepository.save(profile);
    }

    public ProfileDto getProfile(Long profileId) {
        Profile profile = getProfileById(profileId);

        return new ProfileDto(
                profile.getUser().getId(),
                profile.getId(),
                profile.getUser().getFirstName(),
                profile.getUser().getLastName(),
                profile.getUser().getEmail(),
                profile.getBio(),
                profile.getAvatarUrl());
    }

    public Profile getProfileById(Long profileId) {
        Profile profile = this.profileRepository.findById(profileId)
                .orElseThrow(() -> new NotFoundException("Profile was not found"));

        return profile;
    }

    private void validateUserAndEmail(User currentUser, UpdateProfileRequest request) {
        if (currentUser.getId() != request.getUserId()) {
            throw new ForbiddenException("Cannot update another user's profile");
        }

        Optional<User> user = this.userRepository.findByEmail(request.getEmail());
        if (user.isPresent() && !currentUser.getEmail().equals(request.getEmail())) {
            throw new BadRequestException("User with that email already exists");
        }

    }

    public UpdateProfileDto updateProfile(UpdateProfileRequest request, Long profileId) {
        Profile profile = getProfileById(profileId);
        User currentUser = this.userService.getCurrentlyLoggedInUser();

        validateUserAndEmail(currentUser, request);

        currentUser.setEmail(request.getEmail());

        profile.setBio(request.getBio().length() > 0 ? request.getBio() : null);
        currentUser.setFirstName(MyUtils.capitalize(request.getFirstName()));
        currentUser.setLastName(MyUtils.capitalize(request.getLastName()));

        User updatedUser = this.userRepository.save(currentUser);
        this.profileRepository.save(profile);

        return new UpdateProfileDto(updatedUser.getFirstName(), updatedUser.getLastName(), updatedUser.getEmail(),
                profile.getAvatarUrl(), updatedUser.getAbbreviation());

    }

    private boolean validatePhotoSize(MultipartFile photo) {
        return photo.getSize() > MAX_MEGA_BYTES * 1024 * 1024;
    }

    private void removeProfilePhoto(UploadProfilePhotoRequest request, Profile profile) {
        this.amazonService.delete(bucketName, profile.getAvatarFilename());
        profile.setAvatarUrl(null);
        profile.setAvatarFilename(null);
        this.profileRepository.save(profile);
    }

    public String uploadProfilePhoto(UploadProfilePhotoRequest request, Long profileId) {
        Profile profile = getProfileById(profileId);

        if (request.getAction().equals("remove")) {
            removeProfilePhoto(request, profile);
            return null;
        }

        if (validatePhotoSize(request.getFile())) {
            throw new BadRequestException("Photo cannot exceed " + MAX_MEGA_BYTES + "MB");
        }

        if (profile.getAvatarFilename() != null) {
            this.amazonService.delete(bucketName, profile.getAvatarFilename());
        }
        String filename = this.amazonService.upload(bucketName, request.getFile().getOriginalFilename(),
                request.getFile());
        Map<String, String> contents = this.amazonService.getPublicUrl(bucketName, filename);
        profile.setAvatarUrl(contents.get("url"));
        profile.setAvatarFilename(contents.get("filename"));

        Profile updatedProfile = this.profileRepository.save(profile);
        return updatedProfile.getAvatarUrl();
    }
}
