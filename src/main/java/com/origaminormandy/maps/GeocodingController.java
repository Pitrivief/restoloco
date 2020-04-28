package com.origaminormandy.maps;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class GeocodingController {
	
	
	@Autowired
	@Qualifier("gouv")
	private GeocodingService geocodingService;
	
	@RequestMapping(value="/maps/geocode", method = RequestMethod.GET)
	public @ResponseBody List<? extends GeocodingAddress> getPossibleAddresses(@RequestParam String q) throws GeocodingException {
		return geocodingService.geocode(q);
	}
}
