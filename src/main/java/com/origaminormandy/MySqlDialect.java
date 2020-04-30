package com.origaminormandy;

import org.hibernate.dialect.MySQL57Dialect;
import org.hibernate.dialect.function.StandardSQLFunction;

public class MySqlDialect extends MySQL57Dialect {

	public MySqlDialect() {
		//registerFunction("st_distance_sphere", new StandardSQLFunction("st_distance_sphere"));
	}

}
