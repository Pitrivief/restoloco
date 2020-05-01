/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.origaminormandy.resto;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.EntityManager;
import javax.persistence.metamodel.Attribute;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.ManagedType;
import javax.persistence.metamodel.Metamodel;

import org.hibernate.SessionFactory;
import org.hibernate.persister.entity.AbstractEntityPersister;
import org.springframework.stereotype.Service;

import cz.jirutka.rsql.parser.ast.AndNode;
import cz.jirutka.rsql.parser.ast.ComparisonNode;
import cz.jirutka.rsql.parser.ast.NoArgRSQLVisitorAdapter;
import cz.jirutka.rsql.parser.ast.OrNode;

/**
 *
 * @author t_ripoll
 */
@Service
public class RSQLSQLSupport extends NoArgRSQLVisitorAdapter<String>{
	
	
    private EntityManager em;
    private Map<String, Field> fieldsByName;

    SessionFactory sessionFactory;
    AbstractEntityPersister persister;

    StringBuilder builder = new StringBuilder();
    private Metamodel metamodel;
    // Get a managed type (entity, embeddable or mapped super classes):
    private  ManagedType<Resto> restoManagedType;

    // Get an entity type:
    private EntityType<Resto> restoEntityType;
    private Attribute<? super Resto, ?> a;

    public RSQLSQLSupport(EntityManager em ) {
            this.em = em;
            this.metamodel = em.getMetamodel();
            this.restoManagedType = metamodel.managedType(Resto.class);
            this.restoEntityType = metamodel.entity(Resto.class);
            sessionFactory = em.getEntityManagerFactory().unwrap(SessionFactory.class);
            persister = ((AbstractEntityPersister)sessionFactory.getClassMetadata(Resto.class));

            fieldsByName = Arrays.stream(Resto.class.getDeclaredFields()).collect(Collectors.toMap(Field::getName, 
                            Function.identity()));
    }

	
	

    @Override
    public String visit(AndNode node) {
    	List<String> nodeResults =  node.getChildren().stream().map (n -> n.accept(this)).collect(Collectors.toList());
        return "(" +  String.join(" AND ", nodeResults) +")";
    }

    @Override
    public String visit(OrNode node) {
    	List<String> nodeResults =  node.getChildren().stream().map (n -> n.accept(this)).collect(Collectors.toList());
    	return "(" +  String.join(" OR ", nodeResults) +")";
    }

    @Override
    public String visit(ComparisonNode node) {
    	  
          switch (RSqlSearchOperation.getSimpleOperator(node.getOperator())) {
   
         
          case EQUAL: {
        	 Field field=  fieldsByName.get(node.getSelector());
        	 Column col = field.getAnnotation(Column.class);
             if (col != null) {
                 
                 System.out.println("Columns: "+col.name());
             }
        	 
             fieldsByName.values().forEach(f -> {
            	 Column col1 = f.getAnnotation(Column.class);
                 if (col1 != null) {
                     
                     System.out.println("Columns: "+col1.name());
                 }
             });
            
        	 a = this.restoEntityType.getAttribute(node.getSelector());
        	 Arrays.stream(persister.getPropertyColumnNames(node.getSelector())).forEach(s -> System.out.println ("S " + s));
        	 
             return node.getSelector() + " = " + node.getArguments().get(0);
          }
          
          case NOT_EQUAL: {
              throw new UnsupportedOperationException();
          }
          case GREATER_THAN: {
              throw new UnsupportedOperationException();
          }
          case GREATER_THAN_OR_EQUAL: {
              throw new UnsupportedOperationException();
          }
          case LESS_THAN: {
             throw new UnsupportedOperationException();
          }
          case LESS_THAN_OR_EQUAL: {
              throw new UnsupportedOperationException();
          }
          case IN:
        	  Arrays.stream(persister.getPropertyColumnNames("cookTypes")).forEach(s -> System.out.println ("S " + s));
         	 
              return node.getSelector() + "in " + node.getArguments().get(0);
          case NOT_IN:
              throw new UnsupportedOperationException();
          }
   
          return null;
    
    
    }
    
}
