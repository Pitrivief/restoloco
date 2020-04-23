package com.origaminormandy.resto;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.Arrays;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class RestoController {

	
	@Autowired
	private RestoRepository restoRepository;
	
	@GetMapping("/list")
	public String list(Model model) {

		Iterable<Resto> restos = restoRepository.findAll();
		
		restos.forEach(r -> System.out.println(r.getName()));
	     
	    model.addAttribute("restos", restos);
	    return "list-resto";
	}
	
	 /**
     * Add Person string.
     *
     * @param model the model
     * @return the string
     */
    @RequestMapping("/admin/add")
    public String getPersonForm(Model model) {
    	Resto resto = new Resto();
    	
    	resto.setOpenings(new ArrayList<Schedule>());
    	Arrays.stream(DayOfWeek.values()).forEach(day -> {
    		Schedule s = new Schedule();
        	s.setDay(day);
        
        	resto.getOpenings().add(s);
    	}
    			
    	);

    	
    	
    	Link link = new Link();
    	resto.setExternalLinks(new ArrayList<>());
    	resto.getExternalLinks().add(link);
    	
        model.addAttribute("resto", resto);
        return "add-resto";
    }
    
    /**
     * Add Person string.
     *
     * @param model the model
     * @return the string
     */
    @RequestMapping(value = "/admin/add", method= RequestMethod.POST)
    public String addPerson(Resto resto) {
    	try {
    		
    		System.out.println(resto.getOpenings().size());
    		restoRepository.save(resto);
    		return "redirect:/list";
    	} catch (ConstraintViolationException e) {
    		return "add-resto";
    	}
       
    }
    
    @RequestMapping(value = "/admin/edit-resto", method= RequestMethod.POST)
    public String editResto(Resto resto) {
    	try {
       		restoRepository.save(resto);
    		return "redirect:/list";
    	} catch (ConstraintViolationException e) {
    		return "edit-resto";
    	}
       
    }
    
    @GetMapping("/admin/edit-resto/{id}")
    public String showUpdateForm(@PathVariable("id") long id, Model model) {
        Resto resto = restoRepository.findById(id)
          .orElseThrow(() -> new IllegalArgumentException("Invalid resto Id:" + id));
         
        model.addAttribute("resto", resto);
        return "edit-resto";
    }
    
    
}
