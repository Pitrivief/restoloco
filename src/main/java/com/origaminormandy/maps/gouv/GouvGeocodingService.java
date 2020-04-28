package com.origaminormandy.maps.gouv;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.origaminormandy.maps.GeocodingAddress;
import com.origaminormandy.maps.GeocodingException;
import com.origaminormandy.maps.GeocodingService;
import com.origaminormandy.maps.Point;
import com.origaminormandy.maps.gouv.response.Feature;
import com.origaminormandy.maps.gouv.response.GouvGeocodingResponse;
import com.origaminormandy.resto.Address;

@Service("gouv")
public class GouvGeocodingService implements GeocodingService {

	private final String API_PATH = "https://api-adresse.data.gouv.fr/search/?q=";

	private RestTemplate restTemplate = new RestTemplate();

	public GouvGeocodingService() {

	}

	public List<GeocodingAddress> geocode(Address address) throws GeocodingException {
		String addressString = address.getNumberAndStreet() + "," + address.getPostalCode() + " " + address.getCity()
				+ ", France";
		return this.geocode(addressString);
	}

	@Override
	public List<GeocodingAddress> geocode(String address) throws GeocodingException {
		String url = API_PATH + address;

		try {
			GouvGeocodingResponse result = restTemplate.getForObject(url, GouvGeocodingResponse.class);
			return toGeocodingAddresses(result);
		} catch (RestClientException e) {
			e.printStackTrace();
			throw new GeocodingException();
		}

	}

	private List<GeocodingAddress> toGeocodingAddresses(GouvGeocodingResponse response) {
		List<GeocodingAddress> locations = new ArrayList<GeocodingAddress>();

		if (response.features == null || response.features.size() == 0)
			return locations;

		response.features.forEach(feature -> {
			locations.add(toGeocodingAddress(feature));
		});

		return locations;
	}
	
	private GeocodingAddress toGeocodingAddress(Feature feature) {
		GeocodingAddress address = new GeocodingAddress();
		address.setPoint(feature.geometry);
		address.setCity(feature.properties.city);
		address.setPostCode(feature.properties.postcode);
		address.setLabel(feature.properties.label);
		address.setStreetAndNumber(feature.properties.name);
		return address;
	}

	public Point geocodeOne(Address address) throws GeocodingException {
		String addressString = address.getNumberAndStreet() + "," + address.getPostalCode() + " " + address.getCity()
				+ ", France";
		return this.geocodeOne(addressString);
	}

	@Override
	public Point geocodeOne(String address) throws GeocodingException {
		try {
			String url = API_PATH + address;
			GouvGeocodingResponse result = restTemplate.getForObject(url, GouvGeocodingResponse.class);

			if (result.features == null || result.features.size() == 0)
				throw new GeocodingException();

			return result.features.get(0).geometry;
		} catch (RestClientException e) {

			throw new GeocodingException();
		}
	}

}
