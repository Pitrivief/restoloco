package com.origaminormandy.resto.dao;

import com.origaminormandy.resto.domain.CookType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CookTypeRepository extends CrudRepository<CookType, String> {

}
