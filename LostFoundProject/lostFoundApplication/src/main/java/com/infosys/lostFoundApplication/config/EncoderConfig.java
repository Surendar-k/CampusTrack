package com.infosys.lostFoundApplication.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class EncoderConfig {
	@Bean
	public PasswordEncoder passwordEncoding() {
		return new BCryptPasswordEncoder();
	}

}

//admin: surendar  ps:123456789
//student: krithi  ps:123456789
//student: sudha   ps:123456
//student: arjun   ps:123456
