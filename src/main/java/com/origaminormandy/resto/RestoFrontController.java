package com.origaminormandy.resto;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.origaminormandy.contact.Contact;
import com.origaminormandy.maps.GeocodingAddress;
import com.origaminormandy.maps.GeocodingPointSimpleImpl;

import io.github.perplexhub.rsql.RSQLJPASupport;
import java.util.ArrayList;

@Controller
public class RestoFrontController {

    @Autowired
    private RestoRepository restoRepository;

    public GeocodingAddress getDefaultLocalisation() {
        GeocodingAddress a = new GeocodingAddress();

        //49.1811824,-0.3727734
        a.setPoint(new GeocodingPointSimpleImpl(-0.372773, 49.1811824));
        a.setLabel("Hotel de ville, 14000 Caen");
        a.setStreetAndNumber("Hotel de ville");
        a.setCity("Caen");
        a.setPostCode("14000");
        return a;
    }

    @Autowired
    private CookTypeRepository cookTypeRepository;

    @GetMapping("/")
    public String home(Model model, @PageableDefault(page = 0, size = 20) Pageable pageable) {

        //Iterable<Resto> restos = restoRepository.findAll();
        Iterable<CookType> cookTypes = cookTypeRepository.findAll();
        //restos.forEach(r -> System.out.println(r.getName()));

        GeocodingAddress a = getDefaultLocalisation();
        Page<RestoDTO> restosPage = restoRepository.findAllOrderByDistanceFromGeocodePointNative(a.getPoint().getLng(), a.getPoint().getLat(), RSQLJPASupport.toSpecification("", true), pageable);

        List<RestoDTO> restos = restosPage.getContent();
        //List<Resto> restos = new ArrayList<Resto>();
        System.out.println("Controller");
        restos.forEach(r -> {
            System.out.println(r.getResto().getName());
            System.out.print(r.getDistance());
        });

        model.addAttribute("pageSize", restosPage.getSize());
        model.addAttribute("currentPage", restosPage.getNumber());

        int totalPages = restosPage.getTotalPages();
        if (totalPages > 0) {
            List<Integer> pageNumbers = IntStream.rangeClosed(1, totalPages)
                    .boxed()
                    .collect(Collectors.toList());
            model.addAttribute("pageNumbers", pageNumbers);
        }else{
            model.addAttribute("pageNumbers", new ArrayList<Integer>());
        }

        model.addAttribute("restos", restos.stream().map(r -> r.getResto()).collect(Collectors.toList()));
        model.addAttribute("cookTypes", cookTypes);
        model.addAttribute("contact", new Contact());
        return "home";
    }

    @GetMapping("/restaurant")
    public String getRestaurant(
            @RequestParam(name = "filter", defaultValue = "") String filter,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "limit", defaultValue = "10") int limit,
            @RequestParam(name = "localisation", required = false) String localisation,
            @RequestParam(name = "lat", required = false) Double lat,
            @RequestParam(name = "lng", required = false) Double lng,
            @PageableDefault(page = 0, size = 20) Pageable pageable,
            Model model
    ) {

        // Node rootNode = new RSQLParser().parse(filter);
        //System.out.print(rootNode.accept(new RSQLSQLSupport()));
        // System.out.print(rootNode.getClass());
        /*String  lat = "49.185830";
                String  lng = "-0.375410";
                Sort sort = Sort.by(Sort.Direction.ASC, "ACOS(COS(RADIANS("+lat+"))*COS(RADIANS(lat))*COS(RADIANS(lng)RADIANS("+lng+"))+SIN(RADIANS("+lat+"))*SIN(RADIANS(lat))");    
                Sort sort2 = Sort.by(Sort.Direction.ASC, "id");  
                
		Iterable<Resto> restos = restoRepository.findAll(RSQLJPASupport.toSpecification(filter, true),
				sort);*/
        if (localisation == null) {
            GeocodingAddress a = getDefaultLocalisation();
            localisation = a.getLabel();
            lng = a.getPoint().getLng();
            lat = a.getPoint().getLat();
        }

        System.out.println("filter " + filter);
        Page<RestoDTO> restosPage = restoRepository.findAllOrderByDistanceFromGeocodePointNative(lng, lat, RSQLJPASupport.toSpecification(filter, true), pageable);

        List<RestoDTO> restos = restosPage.getContent();

        model.addAttribute("pageSize", restosPage.getSize());
        model.addAttribute("currentPage", restosPage.getNumber());

        int totalPages = restosPage.getTotalPages();
        if (totalPages > 0) {
            List<Integer> pageNumbers = IntStream.rangeClosed(1, totalPages)
                    .boxed()
                    .collect(Collectors.toList());
            model.addAttribute("pageNumbers", pageNumbers);
        }else{
            model.addAttribute("pageNumbers", new ArrayList<Integer>());
        }

        model.addAttribute("restos", restos.stream().map(r -> r.getResto()).collect(Collectors.toList()));

        return "restaurant-list";

    }

}
