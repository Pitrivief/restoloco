package com.origaminormandy.resto;

import com.origaminormandy.resto.service.RSQLSQLSupport;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import cz.jirutka.rsql.parser.RSQLParser;
import cz.jirutka.rsql.parser.ast.Node;



@SpringBootTest
public class RSqlSupportTest {

	
	@Autowired
	private RSQLSQLSupport rsqlSupport;
	@Test
	public void test() {
		  Node rootNode = new RSQLParser().parse("cookTypes.name=in=(ASIATIQUE);eatOnSite==1;takeAway==1");
          
          
         assertEquals("", rootNode.accept(rsqlSupport));
	}
}
