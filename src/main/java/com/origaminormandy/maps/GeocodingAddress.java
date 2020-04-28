package com.origaminormandy.maps;

import com.origaminormandy.maps.gouv.response.Geometry;

public class GeocodingAddress {

	private Point point;
	private String streetAndNumber;
	private String city;
	private String postCode;
	private String label;

	public String getStreetAndNumber() {
		return streetAndNumber;
	}
	public void setStreetAndNumber(String streetAndNumber) {
		this.streetAndNumber = streetAndNumber;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getPostCode() {
		return postCode;
	}
	public void setPostCode(String postCode) {
		this.postCode = postCode;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public Point getPoint() {
		return point;
	}
	public void setPoint(Point point) {
		this.point = point;
	}

	
	
	
	
}
