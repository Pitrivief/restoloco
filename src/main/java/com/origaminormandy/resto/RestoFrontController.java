package com.origaminormandy.resto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.origaminormandy.contact.Contact;

import io.github.perplexhub.rsql.RSQLJPASupport;

@Controller
public class RestoFrontController {

	@Autowired
	private RestoRepository restoRepository;

	@Autowired
	private CookTypeRepository cookTypeRepository;
	
	@GetMapping("/")
	public String home(Model model) {
			
		Iterable<Resto> restos = restoRepository.findAll();
		Iterable<CookType> cookTypes = cookTypeRepository.findAll(); 
		restos.forEach(r -> System.out.println(r.getName()));
	     
	    model.addAttribute("restos", restos);
	    model.addAttribute("cookTypes", cookTypes);
	    model.addAttribute("contact", new Contact());
	    return "home";
	}
	

	
	@GetMapping("/restaurant")
	public String getRestaurant(
			@RequestParam( name = "filter", defaultValue = "") String filter,
			@RequestParam( name = "page", defaultValue = "0" ) int page,
			@RequestParam( name = "limit", defaultValue = "10" ) int limit,
			@RequestParam( name = "localisation") String localisation,
			@RequestParam( name = "lat") Double lat,
			@RequestParam( name = "lng") Double lng,
			Model model
			){
			
	
	
		Iterable<Resto> restos = restoRepository.findAll(RSQLJPASupport.toSpecification(filter, true),
				PageRequest.of(page, limit, Sort.by(Sort.Direction.ASC, "id")));
	
		model.addAttribute("restos", restos);
		return "restaurant-list";
		
	}
	
}
