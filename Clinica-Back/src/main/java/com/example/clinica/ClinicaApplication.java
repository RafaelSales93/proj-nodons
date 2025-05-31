package com.example.clinica;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@EnableJpaRepositories("com.example.clinica.repository")
public class ClinicaApplication {
	public static void main(String[] args) {
		SpringApplication.run(ClinicaApplication.class, args);
	}
}
