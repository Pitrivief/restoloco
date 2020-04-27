package com.origaminormandy.resto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.github.perplexhub.rsql.RSQLJPASupport;


@RestController
public class RestoRestController {
	
	@Autowired	
	private RestoRepository restoRepository;
	
	
}
