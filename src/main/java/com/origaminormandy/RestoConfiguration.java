package com.origaminormandy;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class RestoConfiguration implements WebMvcConfigurer {

	@Value("${filestorageservice.directory}")
	private String directory;
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		// TODO Auto-generated method stub
		WebMvcConfigurer.super.addResourceHandlers(registry);
		
		System.out.println("ADD handler " + directory + "**");
        registry.addResourceHandler("/uploaded/**").addResourceLocations("file:" + directory);

	}
	

	
	
}


