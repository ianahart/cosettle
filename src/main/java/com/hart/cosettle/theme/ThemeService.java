package com.hart.cosettle.theme;

import com.hart.cosettle.advice.BadRequestException;
import com.hart.cosettle.advice.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ThemeService {

    private final ThemeRepository themeRepository;

    @Autowired
    public ThemeService(ThemeRepository themeRepository) {
        this.themeRepository = themeRepository;
    }

    public Theme createTheme() {
        return this.themeRepository.save(new Theme("dark"));
    }

    private Theme getThemeById(Long themeId) {
        return this.themeRepository.findById(themeId)
                .orElseThrow(() -> new NotFoundException("Theme not found"));

    }

    public void updateTheme(String theme, Long themeId) {
        if (!theme.equals("dark") && !theme.equals("light")) {
            throw new BadRequestException("Invalid theme given");
        }

        Theme themeToUpdate = getThemeById(themeId);

        if (themeToUpdate != null) {
            themeToUpdate.setTheme(theme);
            this.themeRepository.save(themeToUpdate);
        }
    }
}
