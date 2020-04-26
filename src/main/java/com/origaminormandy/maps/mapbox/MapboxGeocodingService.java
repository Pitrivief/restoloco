package com.origaminormandy.maps.mapbox;

import java.io.UnsupportedEncodingException;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.origaminormandy.maps.Point;
import com.origaminormandy.maps.mapbox.response.MapboxGeocodingResponse;
import com.origaminormandy.resto.Address;


@Service
public class MapboxGeocodingService {

	
	
	private final String TOKEN = "pk.eyJ1IjoibGF1cmVudC1waGkiLCJhIjoiY2s5Z3N1N3d3MG9qbTNmdGJtOWF4MWw1aSJ9.dj8ZAEbltuP31-da1G_9FQ";
	private final String API_PATH = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

	private RestTemplate restTemplate = new RestTemplate();
	
	public MapboxGeocodingService() {
		
	}
	
	public Point geocode(Address address) throws  GeocodingException {
		String addressString = address.getNumberAndStreet() + "," + address.getPostalCode() + " " + address.getCity() +  ", France";
		String url = API_PATH + addressString + ".json" + "?access_token=" + TOKEN;
		MapboxGeocodingResponse result = restTemplate.getForObject(url, MapboxGeocodingResponse.class);
		System.out.println(result.type + " " + result.features.get(0).place_name + " " +result.features.get(0).geometry.getLng());
		
		if(result.features == null || result.features.size() == 0)
			throw new GeocodingException();
		
		return result.features.get(0).geometry;
			      
	}
}
