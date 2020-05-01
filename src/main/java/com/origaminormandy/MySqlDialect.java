package com.origaminormandy;

import org.hibernate.dialect.MySQL57Dialect;
import org.hibernate.dialect.function.StandardSQLFunction;
import org.hibernate.type.StandardBasicTypes;

import com.mysql.cj.MysqlType;

public class MySqlDialect extends MySQL57Dialect {

	public MySqlDialect() {
		//registerFunction("st_distance_sphere", new StandardSQLFunction("st_distance_sphere"));
		
		super();
		 
		registerFunction("st_distance_sphere", new StandardSQLFunction("st_distance_sphere", StandardBasicTypes.LONG));
		registerFunction("POINT", new StandardSQLFunction("POINT"));
	}

}
