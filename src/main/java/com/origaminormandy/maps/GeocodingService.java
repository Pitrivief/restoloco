package com.origaminormandy.maps;

import java.util.List;

import com.origaminormandy.resto.Address;

public interface GeocodingService {

	
	
	public Point geocodeOne(String address) throws  GeocodingException;
	public Point geocodeOne(Address address) throws  GeocodingException;
	
	
	public List<GeocodingAddress> geocode(String address) throws GeocodingException;

	public List<GeocodingAddress> geocode(Address address) throws GeocodingException;
}