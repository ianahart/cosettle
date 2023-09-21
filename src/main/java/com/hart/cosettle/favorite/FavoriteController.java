package com.hart.cosettle.favorite;

import com.hart.cosettle.favorite.request.ToggleFavoriteRequest;
import com.hart.cosettle.favorite.response.GetFavoriteResponse;
import com.hart.cosettle.favorite.response.IsFavoritedResponse;
import com.hart.cosettle.favorite.response.ToggleFavoriteResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    @Autowired
    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping("")
    public ResponseEntity<GetFavoriteResponse> getFavorites(
            @RequestParam("userId") Long userId,
            @RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize,
            @RequestParam("direction") String direction) {

        return ResponseEntity.status(HttpStatus.OK).body(new GetFavoriteResponse("success",
                this.favoriteService.getFavorites(userId, page, pageSize, direction)));
    }

    @GetMapping("/is-favorited")
    public ResponseEntity<IsFavoritedResponse> isFavorited(@RequestParam("userId") Long userId,
            @RequestParam("spaceId") Long spaceId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new IsFavoritedResponse("success", this.favoriteService.isFavorited(userId, spaceId)));
    }

    @PostMapping
    public ResponseEntity<ToggleFavoriteResponse> toggleFavorite(@RequestBody ToggleFavoriteRequest request) {

        this.favoriteService.toggleFavorite(request.getUserId(), request.getSpaceId(), request.getAction());
        return ResponseEntity.status(HttpStatus.OK).body(new ToggleFavoriteResponse("success"));
    }
}
