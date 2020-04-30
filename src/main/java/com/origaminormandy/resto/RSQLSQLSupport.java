/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.origaminormandy.resto;

import cz.jirutka.rsql.parser.ast.AndNode;
import cz.jirutka.rsql.parser.ast.ComparisonNode;
import cz.jirutka.rsql.parser.ast.NoArgRSQLVisitorAdapter;
import cz.jirutka.rsql.parser.ast.OrNode;
import java.util.stream.Collector;
import java.util.stream.Collectors;

/**
 *
 * @author t_ripoll
 */
public class RSQLSQLSupport<String> extends NoArgRSQLVisitorAdapter<String>{

    @Override
    public String visit(AndNode node) {
        
        return "( "+ (node.getChildren().stream().map (n -> n.accept(this) ).collect(Collectors.joining(" AND "))) +" )";
    }

    @Override
    public String visit(OrNode node) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String visit(ComparisonNode node) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
