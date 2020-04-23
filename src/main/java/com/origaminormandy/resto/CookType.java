package com.origaminormandy.resto;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;


@Entity
public class CookType {

	
	@Id
	@NotBlank
    private String name;
     
    private String description;
    
    @ManyToMany
    private List<CookType> restos;
    

	public List<CookType> getRestos() {
		return restos;
	}

	public void setRestos(List<CookType> restos) {
		this.restos = restos;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	
    
    
}
