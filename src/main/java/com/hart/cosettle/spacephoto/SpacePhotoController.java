package com.hart.cosettle.spacephoto;

import com.hart.cosettle.spacephoto.request.CreateSpacePhotoRequest;
import com.hart.cosettle.spacephoto.response.CreateSpacePhotoResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/space-photos")
public class SpacePhotoController {
    private final SpacePhotoService spacePhotoService;

    @Autowired
    public SpacePhotoController(SpacePhotoService spacePhotoService) {
        this.spacePhotoService = spacePhotoService;
    }

    @PostMapping
    public ResponseEntity<CreateSpacePhotoResponse> createSpacePhoto(CreateSpacePhotoRequest request) {
        this.spacePhotoService.createSpacePhoto(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new CreateSpacePhotoResponse("success"));

    }
}
