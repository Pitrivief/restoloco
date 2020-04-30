package com.origaminormandy.resto;


import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

@Repository
public interface RestoRepositoryCustom  {
	

	public List<Resto> custom(Specification s);

	
}
