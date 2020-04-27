package com.origaminormandy.resto;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import com.origaminormandy.resto.Address.AddressType;

@Entity
public class Resto {

	
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private long id;
	     
	    @NotBlank(message = "Name is mandatory")
	    private String name;
	    
	    private String photo;
	    
	    private String bio;
	     
	    private String email;
	    
	    @NotBlank(message = "tel is mandatory")
	    private String phone;
	    
	    private String website;
	    
	   
	    
	    private boolean delivery = true;
	    private boolean takeAway = true;
	    private boolean eatOnSite = false;
	    
	    @Min(-180)
	    @Max(180)
	    @Column(precision=11, scale=8)
	    private Double lng;
	    
	    @Min(-90)
	    @Max(90)
	    @Column(precision=10, scale=8)
	    private Double lat;
	    
	    @OneToMany(cascade={CascadeType.ALL}, orphanRemoval=true)
	    @JoinColumn(name="resto_id")
	    private List<Schedule> openings = new ArrayList<>();
	    
	    @ManyToMany(cascade={CascadeType.ALL})
	    private List<CookType> cookTypes = new ArrayList<>();
	    
	    @OneToMany(cascade={CascadeType.ALL}, orphanRemoval=true)
	    @JoinColumn(name="resto_id")
	    private List<Link> externalLinks = new ArrayList<>();
	    
	    
	    @OneToMany(cascade={CascadeType.ALL}, orphanRemoval=true)
	    @JoinColumn(name="resto_id")
	    private List<Address> addresses = new ArrayList<>();
	    
	    

		public long getId() {
			return id;
		}

		public void setId(long id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPhone() {
			return phone;
		}

		public void setPhone(String phone) {
			this.phone = phone;
		}

		public String getWebsite() {
			return website;
		}

		public void setWebsite(String website) {
			this.website = website;
		}

		public List<Schedule> getOpenings() {
			return openings;
		}

		public void setOpenings(List<Schedule> openings) {
			this.openings = openings;
		}

		public List<Link> getExternalLinks() {
			return externalLinks;
		}

		public void setExternalLinks(List<Link> externalLinks) {
			this.externalLinks = externalLinks;
		}

		public Double getLng() {
			return lng;
		}

		public void setLng(Double lng) {
			this.lng = lng;
		}

		public Double getLat() {
			return lat;
		}

		public void setLat(Double lat) {
			this.lat = lat;
		}


		public List<CookType> getCookTypes() {
			return cookTypes;
		}

		public void setCookTypes(List<CookType> cookTypes) {
			this.cookTypes = cookTypes;
		}
		
		public String getBio() {
			return bio;
		}

		public void setBio(String bio) {
			this.bio = bio;
		}

		public String getPhoto() {
			return photo;
		}

		public void setPhoto(String photo) {
			this.photo = photo;
		}

		public boolean isDelivery() {
			return delivery;
		}

		public void setDelivery(boolean delivery) {
			this.delivery = delivery;
		}

		public boolean isTakeAway() {
			return takeAway;
		}

		public void setTakeAway(boolean takeAway) {
			this.takeAway = takeAway;
		}

		public boolean isEatOnSite() {
			return eatOnSite;
		}

		public void setEatOnSite(boolean eatOnSite) {
			this.eatOnSite = eatOnSite;
		}

		public List<Address> getAddresses() {
			return addresses;
		}

		public void setAddresses(List<Address> addresses) {
			this.addresses = addresses;
		}
		
		public Optional<Address> getBillingAddress() {
			if(this.addresses == null)return Optional.empty();
			
			return this.addresses.stream().filter(a -> a.getType() == AddressType.BILLING).findFirst();
		}
		
		public Optional<Address> getDeliveryAddress() {
			if(this.addresses == null)return Optional.empty();
			
			return this.addresses.stream().filter(a -> a.getType() == AddressType.DELIVERY).findFirst();
		}
		
		
	    
		
	    
}
