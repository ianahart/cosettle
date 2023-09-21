package com.hart.cosettle.space;

import com.hart.cosettle.space.dto.SpaceDto;
import com.hart.cosettle.space.dto.SpacePaginationDto;
import com.hart.cosettle.space.request.CreateSpaceRequest;
import com.hart.cosettle.user.UserService;
import com.hart.cosettle.util.MyUtils;
import com.hart.cosettle.advice.NotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SpaceService {

    private final SpaceRepository spaceRepository;
    private final UserService userService;

    @Autowired
    public SpaceService(SpaceRepository spaceRepository, UserService userService) {
        this.spaceRepository = spaceRepository;
        this.userService = userService;
    }

    public SpaceDto getSpace(Long id) {
        Space spaceEntity = getSpaceById(id);
        SpaceDto spaceDto = this.spaceRepository.getSpace(id);

        spaceDto.setPhotos(spaceEntity.getSpacePhotos());
        return spaceDto;

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

    private List<SpaceDto> addPhotosToSpace(List<SpaceDto> spaces) {

        List<SpaceDto> spaceDtos = new ArrayList<>();
        for (SpaceDto spaceDto : spaces) {
            Space spaceEntity = getSpaceById(spaceDto.getId());
            spaceDto.setPhotos(spaceEntity.getSpacePhotos());
            spaceDtos.add(spaceDto);
        }

        return spaceDtos;
    }

    private Page<SpaceDto> preformSpacesQuery(String spaceType, String city, String country, Pageable paging) {
        Page<SpaceDto> spaces;

        if (country.equals("All") && spaceType.equals("All")) {
            spaces = this.spaceRepository.getAllSpaces(paging);

        } else if (country.equals("All") && !spaceType.equals("All")) {
            spaces = this.spaceRepository.getAllByCountries(spaceType.toLowerCase(), paging);

        } else if (!country.equals("All") && spaceType.equals("All")) {
            spaces = this.spaceRepository.getAllBySpaces(country.toLowerCase(), paging);

        } else {
            spaces = this.spaceRepository.getSpaces(country.toLowerCase(), spaceType, city.toLowerCase(),
                    paging);

        }
        return spaces;
    }

    public SpacePaginationDto<SpaceDto> getSpaces(String country, String spaceType, String city, int page, int pageSize,
            String direction) {
        int currentPage = MyUtils.paginate(page, direction);
        Pageable paging = PageRequest.of(currentPage, pageSize, Sort.by("id").descending());

        Page<SpaceDto> spaces = preformSpacesQuery(spaceType, city, country, paging);

        return new SpacePaginationDto<SpaceDto>(
                addPhotosToSpace(spaces.getContent()),
                currentPage,
                pageSize,
                spaces.getTotalPages(),
                direction);

    }
}
