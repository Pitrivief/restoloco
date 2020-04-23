package com.origaminormandy;

import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.OffsetTime;

import org.springframework.boot.context.properties.ConfigurationPropertiesBinding;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;


@Component
@ConfigurationPropertiesBinding
public class OffsetTimeConverter implements Converter<String, OffsetTime>{
	
	@Override
	public OffsetTime convert(String timeString) {
		return timeString.isEmpty()?null:OffsetTime.of(LocalTime.parse(timeString), OffsetDateTime.now().getOffset());
	}

}
