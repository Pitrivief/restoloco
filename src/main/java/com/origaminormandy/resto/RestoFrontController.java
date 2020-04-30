package com.origaminormandy.resto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.origaminormandy.contact.Contact;
import cz.jirutka.rsql.parser.RSQLParser;
import cz.jirutka.rsql.parser.ast.AndNode;
import cz.jirutka.rsql.parser.ast.Node;

import io.github.perplexhub.rsql.RSQLJPASupport;
import java.util.ArrayList;

@Controller
public class RestoFrontController {

	@Autowired
	private RestoRepository restoRepository;
	


	@Autowired
	private CookTypeRepository cookTypeRepository;
	
	@GetMapping("/")
	public String home(Model model) {
			

		//Iterable<Resto> restos = restoRepository.findAll();
		Iterable<CookType> cookTypes = cookTypeRepository.findAll(); 
		//restos.forEach(r -> System.out.println(r.getName()));
		
		List<Resto> restos = restoRepository.findAll();
		
		//List<Resto> restos = new ArrayList<Resto>();
		restos.forEach(r -> {
			System.out.println(r.getEmail());
			//System.out.print(r.getDistance());
		});
	     
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
			//@RequestParam( name = "localisation") String localisation,
			//@RequestParam( name = "lat") Double lat,
			//@RequestParam( name = "lng") Double lng,
			Model model
			){
			

                Node rootNode = new RSQLParser().parse(filter);
                
               
                 System.out.print(rootNode.accept(new RSQLSQLSupport()));
                 RSQLJPASupport
                // System.out.print(rootNode.getClass());
		/*String  lat = "49.185830";
                String  lng = "-0.375410";
                Sort sort = Sort.by(Sort.Direction.ASC, "ACOS(COS(RADIANS("+lat+"))*COS(RADIANS(lat))*COS(RADIANS(lng)RADIANS("+lng+"))+SIN(RADIANS("+lat+"))*SIN(RADIANS(lat))");    
                Sort sort2 = Sort.by(Sort.Direction.ASC, "id");  
                
		Iterable<Resto> restos = restoRepository.findAll(RSQLJPASupport.toSpecification(filter, true),
				sort);*/
		model.addAttribute("restos", new ArrayList<Resto>());
	
		return "restaurant-list";
		
	}
	
}
