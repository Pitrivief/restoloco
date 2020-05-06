package com.origaminormandy.resto.domain;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Link {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	enum LinkType {
		ORDER, SOCIAL,
	}

	@Enumerated(EnumType.STRING)
	private LinkType type;

	private String subtype;

	private String description;
	private String url;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}



	public String getSubtype() {
		return subtype;
	}

	public void setSubtype(String subtype) {
		this.subtype = subtype;
	}

	public LinkType getType() {
		return type;
	}

	public void setType(LinkType type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

}
