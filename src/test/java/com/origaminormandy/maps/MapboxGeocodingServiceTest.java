package com.origaminormandy.maps;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.UnsupportedEncodingException;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.ContextConfiguration;

import com.origaminormandy.maps.mapbox.GeocodingException;
import com.origaminormandy.maps.mapbox.MapboxGeocodingService;
import com.origaminormandy.resto.Address;


@ContextConfiguration(classes = {MapboxGeocodingService.class})
@WebMvcTest
public class MapboxGeocodingServiceTest {

	@Autowired
	public MapboxGeocodingService geocodingService;
	
	@Test
	public void testGeocoding() throws GeocodingException {
		Address a = new Address();
		a.setCity("Amfreville");
		a.setPostalCode("14860");
		a.setNumberAndStreet("28 rue du pays d'auge");
		
		Point p = geocodingService.geocode(a);
		assertEquals(-0.226915, p.getLng());
		assertEquals(49.253953, p.getLat());
	}
}
