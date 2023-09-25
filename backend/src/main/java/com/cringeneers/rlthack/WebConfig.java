package com.cringeneers.rlthack;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Очень плохая практика, полное игнорирование CORS, но я в этом не шарю
        registry.addMapping("/**").allowedMethods("*");
    }
}
