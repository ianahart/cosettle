package com.hart.cosettle.space;

import com.hart.cosettle.space.request.CreateSpaceRequest;
import com.hart.cosettle.space.response.CreateSpaceResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@Validated
@RequestMapping(path = "/api/v1/spaces")
public class SpaceController {

    private final SpaceService spaceService;

    @Autowired
    public SpaceController(SpaceService spaceService) {
        this.spaceService = spaceService;
    }

    @PostMapping
    public ResponseEntity<CreateSpaceResponse> createSpace(@Valid @RequestBody CreateSpaceRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CreateSpaceResponse("success", this.spaceService.createSpace(request)));
    }
}
