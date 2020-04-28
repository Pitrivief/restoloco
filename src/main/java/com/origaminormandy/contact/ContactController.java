package com.origaminormandy.contact;

import java.util.HashMap;
import java.util.Map;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ControllerAdvice
public class ContactController {

	@Autowired
	private ContactRepository contactRepository;

	@RequestMapping("/contact")
	public String getContactForm(Model model) {
		Contact contact = new Contact();
		model.addAttribute("contact", contact);
		return "add-contact";
	}

	@RequestMapping(value = "/contact", method = RequestMethod.POST)
	public String addContact(Contact contact) {
		try {
			contactRepository.save(contact);
			return "redirect:/list";
		} catch (ConstraintViolationException e) {
			return "add-contact";
		}

	}

	@RequestMapping(value="/contact-ajax", method = RequestMethod.POST)
	public @ResponseBody Map<String, String> addContacAjax(Contact contact) {

		contactRepository.save(contact);
		Map<String, String> result = new HashMap();
		return result;

	}

	@ExceptionHandler(ConstraintViolationException.class)
	public @ResponseBody ResponseEntity<?> handleConstraintViolationException(ConstraintViolationException e) {
		Map<String, String> result = new HashMap<>();
		result.put("error", e.getMessage());
		e.getConstraintViolations().forEach(violation -> {
			result.put(violation.getPropertyPath().toString(), violation.getMessage());
		});

		return ResponseEntity.badRequest().body(result);
	}

}
