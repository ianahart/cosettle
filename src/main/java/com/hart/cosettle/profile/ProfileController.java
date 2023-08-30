package com.hart.cosettle.profile;

import com.hart.cosettle.profile.request.UpdateProfileRequest;
import com.hart.cosettle.profile.request.UploadProfilePhotoRequest;
import com.hart.cosettle.profile.response.GetProfileResponse;
import com.hart.cosettle.profile.response.UpdateProfileResponse;
import com.hart.cosettle.profile.response.UploadProfilePhotoResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@Validated
@RequestMapping("/api/v1/profiles")
public class ProfileController {

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{profileId}")
    public ResponseEntity<GetProfileResponse> getProfile(@PathVariable("profileId") Long profileId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetProfileResponse("success", this.profileService.getProfile(profileId)));
    }

    @PatchMapping("/{profileId}/upload")
    public ResponseEntity<UploadProfilePhotoResponse> uploadProfilePhoto(@PathVariable("profileId") Long profileId,
            UploadProfilePhotoRequest request) {

        return ResponseEntity.status(HttpStatus.OK).body(
                new UploadProfilePhotoResponse("success", this.profileService.uploadProfilePhoto(request, profileId)));
    }

    @PatchMapping("/{profileId}")
    public ResponseEntity<UpdateProfileResponse> updateProfile(@PathVariable("profileId") Long profileId,
            @Valid @RequestBody UpdateProfileRequest request) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new UpdateProfileResponse("success", this.profileService.updateProfile(request, profileId)));

    }
}
