package com.origaminormandy.resto;

import java.time.DayOfWeek;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Address {
	
	
	
	
	enum AddressType{
		DELIVERY,
		BILLING,
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	
	@Enumerated(EnumType.STRING)
	private AddressType type;
	
	
	private String name;
	private String recipientName;
	private String recipientComplement1; 
	private String addressComplement1; 
	private String addressComplement2; 
	
	private String numberAndStreet;
	private  String postalCode;
	
	private String city;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRecipientName() {
		return recipientName;
	}

	public void setRecipientName(String recipientName) {
		this.recipientName = recipientName;
	}

	public String getRecipientComplement1() {
		return recipientComplement1;
	}

	public void setRecipientComplement1(String recipientComplement1) {
		this.recipientComplement1 = recipientComplement1;
	}

	public String getAddressComplement1() {
		return addressComplement1;
	}

	public void setAddressComplement1(String addressComplement1) {
		this.addressComplement1 = addressComplement1;
	}

	public String getAddressComplement2() {
		return addressComplement2;
	}

	public void setAddressComplement2(String addressComplement2) {
		this.addressComplement2 = addressComplement2;
	}

	public String getNumberAndStreet() {
		return numberAndStreet;
	}

	public void setNumberAndStreet(String numberAndStreet) {
		this.numberAndStreet = numberAndStreet;
	}

	

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public AddressType getType() {
		return type;
	}

	public void setType(AddressType type) {
		this.type = type;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	
	
	
	
}
