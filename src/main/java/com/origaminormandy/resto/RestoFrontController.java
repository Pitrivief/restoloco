package com.origaminormandy.resto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RestoFrontController {

	@Autowired
	private RestoRepository restoRepository;
	
	@GetMapping("/")
	public String home(Model model) {

		Iterable<Resto> restos = restoRepository.findAll();
		
		restos.forEach(r -> System.out.println(r.getName()));
	     
	    model.addAttribute("restos", restos);
	   
	    return "home";
	}
}
