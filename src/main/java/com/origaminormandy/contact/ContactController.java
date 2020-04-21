package com.origaminormandy.contact;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ContactController {

	
	@Autowired
	private ContactRepository contactRepository;
	
	
    @RequestMapping("/contact")
    public String getContactForm(Model model) {
    	Contact contact = new Contact();
        model.addAttribute("contact", contact);
        return "add-contact";
    }
    
   
    @RequestMapping(value = "/contact", method= RequestMethod.POST)
    public String addContact(Contact contact) {
    	try {
    		contactRepository.save(contact);
    		return "redirect:/list";
    	} catch (ConstraintViolationException e) {
    		return "add-contact";
    	}
       
    }
}
