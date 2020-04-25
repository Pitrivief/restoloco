package com.origaminormandy.resto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.origaminormandy.contact.Contact;

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
}
