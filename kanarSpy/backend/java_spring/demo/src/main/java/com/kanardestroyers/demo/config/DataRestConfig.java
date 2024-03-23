package com.kanardestroyers.demo.config;

import com.kanardestroyers.demo.entity.Kanar;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;


@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {



    //nadam tutaj corsy pod localhost springowski
    private String origin = "http://127.0.0.1:5500/";


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors){

        config.exposeIdsFor(Kanar.class);
        cors.addMapping(config.getBasePath() + "/**").allowedOrigins(origin);



    }

}
