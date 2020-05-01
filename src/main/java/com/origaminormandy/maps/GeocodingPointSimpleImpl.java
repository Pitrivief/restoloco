package com.origaminormandy.maps;

public class GeocodingPointSimpleImpl implements Point {

	
	private double lng;
	private double lat;
	
	
	
	
	public GeocodingPointSimpleImpl(double lng, double lat) {
		super();
		this.lng = lng;
		this.lat = lat;
	}

	@Override
	public Double getLng() {
		return lng;
	}

	@Override
	public Double getLat() {
		return lat;
	}

}
