package com.hart.cosettle.spacephoto;

import java.io.IOException;
import java.util.Map;

import com.hart.cosettle.space.Space;
import com.hart.cosettle.space.SpaceService;
import com.hart.cosettle.spacephoto.request.CreateSpacePhotoRequest;
import com.hart.cosettle.advice.BadRequestException;
import com.hart.cosettle.amazon.AmazonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class SpacePhotoService {

    private final SpacePhotoRepository spacePhotoRepository;
    private final SpaceService spaceService;
    private final AmazonService amazonService;
    private final int MAX_MEGA_BYTES = 3;
    private final String bucketName = "arrow-date/cosettle/photos";

    @Autowired
    public SpacePhotoService(SpacePhotoRepository spacePhotoRepository,
            SpaceService spaceService,
            AmazonService amazonService) {
        this.spacePhotoRepository = spacePhotoRepository;
        this.spaceService = spaceService;
        this.amazonService = amazonService;
    }

    public void validatePhotoSize(Long bytes, Long spaceId) {
        if (bytes > MAX_MEGA_BYTES * 1024 * 1024) {
            this.spaceService.deleteSpace(spaceId);
            throw new BadRequestException("Upload size of 3MiB exceeded");
        }
    }

    public void createSpacePhoto(CreateSpacePhotoRequest request) {
        Space space = this.spaceService.getSpaceById(request.getSpaceId());

        for (MultipartFile file : request.getPhotos()) {
            validatePhotoSize(file.getSize(), space.getId());
            String filename = this.amazonService.upload(bucketName, file.getOriginalFilename(), file);
            Map<String, String> contents = this.amazonService.getPublicUrl(bucketName, filename);
            this.spacePhotoRepository.save(new SpacePhoto(contents.get("url"), contents.get("filename"), space));
        }
    }
}
