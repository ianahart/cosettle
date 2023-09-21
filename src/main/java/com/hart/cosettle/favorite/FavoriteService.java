package com.hart.cosettle.favorite;

import com.hart.cosettle.space.Space;
import com.hart.cosettle.space.SpaceService;
import com.hart.cosettle.user.User;
import com.hart.cosettle.user.UserService;
import com.hart.cosettle.util.MyUtils;

import java.util.List;

import com.hart.cosettle.advice.BadRequestException;
import com.hart.cosettle.advice.NotFoundException;
import com.hart.cosettle.favorite.dto.FavoriteDto;
import com.hart.cosettle.favorite.dto.PaginationDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class FavoriteService {

    private final UserService userService;
    private final SpaceService spaceService;
    private final FavoriteRepository favoriteRepository;

    @Autowired
    public FavoriteService(
            UserService userService,
            SpaceService spaceService,
            FavoriteRepository favoriteRepository) {
        this.userService = userService;
        this.spaceService = spaceService;
        this.favoriteRepository = favoriteRepository;
    }

    public void toggleFavorite(Long userId, Long spaceId, String action) {
        if (action.equals("favorite")) {
            addFavorite(userId, spaceId);
        } else {
            removeFavorite(userId, spaceId);
        }
    }

    private boolean checkExistingFavorite(Long userId, Long spaceId) {
        Pageable firstOnly = PageRequest.of(0, 1);
        Page<Favorite> result = this.favoriteRepository.getFavorite(userId, spaceId, firstOnly);
        if (result.getContent().size() > 0) {
            return true;
        }
        return false;
    }

    private void addFavorite(Long userId, Long spaceId) {
        if (userId == null || spaceId == null) {
            throw new BadRequestException("Missing parameters");
        }

        if (checkExistingFavorite(userId, spaceId)) {
            throw new BadRequestException("You have already favorited this space");
        }

        User user = this.userService.getUserById(userId);
        Space space = this.spaceService.getSpaceById(spaceId);

        this.favoriteRepository.save(new Favorite(user, space));
    }

    private void removeFavorite(Long userId, Long spaceId) {
        Pageable firstOnly = PageRequest.of(0, 1);
        Page<Favorite> result = this.favoriteRepository.getFavorite(userId, spaceId, firstOnly);
        this.favoriteRepository.delete(result.getContent().get(0));
    }

    public Boolean isFavorited(Long userId, Long spaceId) {
        Pageable firstOnly = PageRequest.of(0, 1);
        Page<Favorite> result = this.favoriteRepository.getFavorite(userId, spaceId, firstOnly);
        System.out.println(result.getContent().size());
        if (result.getContent().size() == 1) {
            return true;
        }
        return false;

    }

    public Favorite getFavoriteById(Long favoriteId) {
        return this.favoriteRepository.findById(favoriteId)
                .orElseThrow(() -> new NotFoundException("Favorite not found"));
    }

    private List<FavoriteDto> attachFavoritePhoto(List<FavoriteDto> favorites) {

        for (FavoriteDto favoriteDto : favorites) {
            Favorite favoriteEntity = getFavoriteById(favoriteDto.getId());
            favoriteDto.setSpacePhoto(favoriteEntity.getSpace().getSpacePhotos().get(0));

        }
        return favorites;
    }

    public PaginationDto<FavoriteDto> getFavorites(Long userId, int page, int pageSize, String direction) {
        int currentPage = MyUtils.paginate(page, direction);
        Pageable paging = PageRequest.of(currentPage, pageSize, Sort.by("id").descending());
        Page<FavoriteDto> result = this.favoriteRepository.getFavorites(userId, paging);

        return new PaginationDto<FavoriteDto>(attachFavoritePhoto(result.getContent()), currentPage, pageSize,
                result.getTotalPages(),

                direction);

    }
}
