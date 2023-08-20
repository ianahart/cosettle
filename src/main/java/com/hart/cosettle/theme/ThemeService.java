package com.hart.cosettle.theme;

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
        return this.themeRepository.save(new Theme());
    }
}
