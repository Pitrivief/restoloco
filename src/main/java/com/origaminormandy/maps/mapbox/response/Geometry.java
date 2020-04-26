package com.origaminormandy.maps.mapbox.response;

import com.origaminormandy.maps.Point;

public class Geometry implements Point {
	public String type;
	public Double[] coordinates;
	
	public Double getLat() {
		return coordinates[1];
	}
	
	public Double getLng() {
		return coordinates[0];
	}
}
