package com.origaminormandy.resto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.origaminormandy.contact.Contact;

import cz.jirutka.rsql.parser.RSQLParser;
import cz.jirutka.rsql.parser.ast.Node;

@Controller
public class RestoFrontController {

	@Autowired
	private RestoRepository restoRepository;
	


	@Autowired
	private CookTypeRepository cookTypeRepository;
	
	@GetMapping("/")
	public String home(Model model,  @PageableDefault(page = 0, size = 20) Pageable pageable) {
			

		//Iterable<Resto> restos = restoRepository.findAll();
		Iterable<CookType> cookTypes = cookTypeRepository.findAll(); 
		//restos.forEach(r -> System.out.println(r.getName()));
		
		
		Page<RestoDTO> restosPage = restoRepository.findAllOrderByDistanceFromGeocodePointNative(-0.35,  49.17, pageable);
		
		List<RestoDTO> restos = restosPage.getContent();
		//List<Resto> restos = new ArrayList<Resto>();
				System.out.println("Controller");
		restos.forEach(r -> {
			System.out.println(r.getResto().getName());
			System.out.print(r.getDistance());
		});
	     
	    model.addAttribute("restos", restos.stream().map(r -> r.getResto()).collect(Collectors.toList()));
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
			@PageableDefault(page = 0, size = 20) Pageable pageable,
			Model model
			){
			

                Node rootNode = new RSQLParser().parse(filter);       
                 System.out.print("ok");
                 System.out.print(rootNode.getClass());
	
                 
                Page<RestoDTO> restosPage = restoRepository.findAllOrderByDistanceFromGeocodePoint(lng,  lat, pageable);
         		
         		List<RestoDTO> restos = restosPage.getContent();
         		//List<Resto> restos = new ArrayList<Resto>();
         				System.out.println("Controller");
         		restos.forEach(r -> {
         			System.out.println(r.getResto().getName());
         			System.out.print(r.getDistance());
         		});
         	     
		model.addAttribute("restos", new ArrayList<Resto>());

		return "restaurant-list";
		
	}
	
}
