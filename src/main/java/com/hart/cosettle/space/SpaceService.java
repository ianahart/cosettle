package com.hart.cosettle.space;

import com.hart.cosettle.space.request.CreateSpaceRequest;
import com.hart.cosettle.user.UserService;

import com.hart.cosettle.advice.NotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SpaceService {

    private final SpaceRepository spaceRepository;
    private final UserService userService;

    @Autowired
    public SpaceService(SpaceRepository spaceRepository, UserService userService) {
        this.spaceRepository = spaceRepository;
        this.userService = userService;
    }

    public Boolean convertStringToBoolean(String stringBoolean) {
        return stringBoolean.equals("true") ? true : false;
    }

    public Space getSpaceById(Long id) {
        return this.spaceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Space not found"));
    }

    public void deleteSpace(Long id) {
        this.spaceRepository.deleteById(id);
    }

    public Space packageSpace(CreateSpaceRequest request) {
        return new Space(
                this.userService.getCurrentlyLoggedInUser(),
                request.getSize(),
                request.getCapacity(),
                request.getStreet(),
                request.getCity(),
                request.getCountry(),
                request.getType(),
                request.getDescription(),
                request.getFlooring(),
                request.getWifi(),
                request.getPrice(),
                request.getDays(),
                request.getOpenTime(),
                request.getCloseTime(),
                convertStringToBoolean(request.getBathrooms()),
                convertStringToBoolean(request.getUtilities()),
                convertStringToBoolean(request.getFood()),
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                request.getPhoneNumber());

    }

    public Long createSpace(CreateSpaceRequest request) {
        Space newSpace = packageSpace(request);

        Space space = this.spaceRepository.save(newSpace);
        return space.getId();
    }
}
