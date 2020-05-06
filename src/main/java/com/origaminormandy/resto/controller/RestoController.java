package com.origaminormandy.resto.controller;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.origaminormandy.maps.GeocodingException;
import com.origaminormandy.maps.GeocodingService;
import com.origaminormandy.maps.Point;
import com.origaminormandy.resto.domain.Address;
import com.origaminormandy.resto.domain.AddressType;
import com.origaminormandy.resto.domain.CookType;
import com.origaminormandy.resto.dao.CookTypeRepository;
import com.origaminormandy.resto.domain.Resto;
import com.origaminormandy.resto.dao.RestoRepository;
import com.origaminormandy.resto.domain.Schedule;

@Controller
public class RestoController {

	@Autowired
	private RestoRepository restoRepository;
	
	@Autowired
        @Qualifier("gouv")
	private GeocodingService geocodingService;

	@Autowired
	private CookTypeRepository cookTypeRepository;

	@GetMapping("/admin/list")
	public String list(Model model) {

		Iterable<Resto> restos = restoRepository.findAll();

		restos.forEach(r -> System.out.println(r.getName()));

		model.addAttribute("restos", restos);
		return "list-resto";
	}

	/**
	 * Add Person string.
	 *
	 * @param model
	 *            the model
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

	
		Address address = new Address();
		address.setType(AddressType.DELIVERY);
		
		address.setName("Par defaut");
		
		resto.setAddresses(new ArrayList<>());
		resto.getAddresses().add(address);
		
		Iterable<CookType> allCookTypes = cookTypeRepository.findAll();
		model.addAttribute("allCookTypes", allCookTypes);

		model.addAttribute("resto", resto);
		return "admin/add-resto";
	}

	/**
	 * Add Person string.
	 *
	 * @param model
	 *            the model
	 * @return the string
	 */
	@RequestMapping(value = "/admin/add", method = RequestMethod.POST)
	public String addPerson(Resto resto) {
		try {

			clearRestoData(resto);
			
			if (resto.getCookTypes() != null) {
				List<CookType> selectedCookTypes = (List<CookType>) cookTypeRepository.findAllById(
						resto.getCookTypes().stream().map(cookType -> cookType.getName()).collect(Collectors.toList()));
				resto.setCookTypes(selectedCookTypes);
			}
			
			if((resto.getLat() == null || resto.getLng() == null) && resto.getDeliveryAddress().isPresent()) {
				try {
					Point p = geocodingService.geocodeOne(resto.getDeliveryAddress().get());
					resto.setLat(p.getLat());
					resto.setLng(p.getLng());
				} catch (GeocodingException e) {
					e.printStackTrace();
				}
			}
			
			restoRepository.save(resto);
			return "redirect:/admin/list";
		} catch (ConstraintViolationException e) {
			return "admin/add-resto";
		}

	}

	@RequestMapping(value = "/admin/edit-resto", method = RequestMethod.POST)
	public String editResto(Resto resto) {
		try {

			
			clearRestoData(resto);

			if (resto.getCookTypes() != null) {

				List<CookType> selectedCookTypes = (List<CookType>) cookTypeRepository.findAllById(
						resto.getCookTypes().stream().map(cookType -> cookType.getName()).collect(Collectors.toList()));
				resto.setCookTypes(selectedCookTypes);

			}
			restoRepository.save(resto);
			return "redirect:/admin/list";
		} catch (ConstraintViolationException e) {
			return "admin/edit-resto";
		}

	} 
	
	private void clearRestoData(Resto resto) {
		String clearPhone = resto.getPhone().replaceAll("\\s+", "").replaceAll("\\.", "");
		resto.setPhone(clearPhone);
	}

	@GetMapping("/admin/edit-resto/{id}")
	public String showUpdateForm(@PathVariable("id") long id, Model model) {

		
		
		
		Iterable<CookType> allCookTypes = cookTypeRepository.findAll();
		Resto resto = restoRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Invalid resto Id:" + id));

		System.out.println("size get lins" + resto.getExternalLinks());
		model.addAttribute("resto", resto);
		model.addAttribute("allCookTypes", allCookTypes);
		return "admin/edit-resto";
	}

}
