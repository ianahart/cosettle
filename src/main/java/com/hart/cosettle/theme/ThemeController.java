package com.hart.cosettle.theme;

import com.hart.cosettle.theme.reponse.UpdateThemeResponse;
import com.hart.cosettle.theme.request.UpdateThemeRequest;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/themes")
public class ThemeController {
    private final ThemeService themeService;

    @Autowired
    public ThemeController(ThemeService themeService) {
        this.themeService = themeService;
    }

    @PatchMapping("/{themeId}")
    public ResponseEntity<UpdateThemeResponse> updateTheme(@PathVariable("themeId") Long themeId,
            @RequestBody UpdateThemeRequest request) {

        this.themeService.updateTheme(request.getTheme(), themeId);
        return ResponseEntity.status(HttpStatus.SC_OK)
                .body(new UpdateThemeResponse("success"));
    }
}
