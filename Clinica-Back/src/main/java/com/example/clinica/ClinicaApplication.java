package com.example.clinica;

import com.example.clinica.entity.*;
import com.example.clinica.enums.StatusConsulta;
import com.example.clinica.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
@EnableJpaRepositories("com.example.clinica.repository")
public class ClinicaApplication {
	public static void main(String[] args) {
		SpringApplication.run(ClinicaApplication.class, args);
	}

	@Bean
	CommandLineRunner initData(PacienteRepository pacienteRepo,
							   ConsultaRepository consultaRepo,
							   HistoricoRepository historicoRepo) {
		return args -> {
			pacienteRepo.deleteAll();
			consultaRepo.deleteAll();
			Paciente p1 = new Paciente(null, "Samuel Osvaldo Ribeiro",
					LocalDate.of(1990, 5, 20), "Rua Salvador do Vale, 123", "(11) 2539-1053",
					"samuel-ribeiro5894@gtx.ag", "568.118.960-00", "M", true);

			Paciente p2 = new Paciente(null, "Samuel Ribeiro",
					LocalDate.of(1990, 5, 20), "Rua Salvador do Vale, 123", "(11) 2539-1053",
					"samuel-ribeiro94@gtx.ag", "951.662.457-09", "M", true);

			Paciente p3 = new Paciente(null, "Luna Hadassa Lopes",
					LocalDate.of(1985, 8, 15), "Rua B, 456", "(11) 98888-8888",
					"luna-lopes96@inepar.com.br", "192.327.737-59", "F", true);

			Paciente p4 = new Paciente(null, "Ana Carolina Farias",
					LocalDate.of(1995, 11, 30), "Avenida Paulista, 1000", "(11) 91234-5678",
					"ana.farias@email.com", "328.456.789-01", "F", true);

			Paciente p5 = new Paciente(null, "Ricardo Alves",
					LocalDate.of(1982, 7, 25), "Rua das Palmeiras, 789", "(11) 94567-1234",
					"ricardo.alves@email.com", "147.258.369-99", "M", true);



			Consulta c1 = new Consulta(null, LocalDate.now().plusDays(2), "Check-up geral",
					"Dr. Fernanda", StatusConsulta.CONCLUIDA, true, p1);

			Consulta c2 = new Consulta(null, LocalDate.now().plusDays(3), "Check-up geral",
					"Dr. Fernanda", StatusConsulta.CONCLUIDA, true, p2);

			Consulta c3 = new Consulta(null, LocalDate.now().plusDays(5), "Exame cardiológico",
					"Dr. Roberto", StatusConsulta.CANCELADA, true,p3);

			Consulta c4 = new Consulta(null, LocalDate.now().plusDays(7), "Acompanhamento nutricional",
					"Dra. Juliana", StatusConsulta.ABERTA, true, p4);

			Consulta c5 = new Consulta(null, LocalDate.now().plusDays(10), "Consulta dermatológica",
					"Dra. Bianca", StatusConsulta.AGENDADO, true, p5);


			Historico h1 = new Historico(null, LocalDate.now().plusDays(10), StatusConsulta.CONCLUIDA, true,"Check-up geral", c1);
			Historico h2 = new Historico(null, LocalDate.now().plusDays(9), StatusConsulta.CONCLUIDA, true,"Check-up geral", c2);
			Historico h3 = new Historico(null, LocalDate.now().plusDays(8), StatusConsulta.CANCELADA, true,"Check-up geral", c3);
			Historico h4 = new Historico(null, LocalDate.now().plusDays(7), StatusConsulta.ABERTA, true,"Check-up geral", c4);
			Historico h5 = new Historico(null, LocalDate.now().plusDays(6), StatusConsulta.ABERTA, true,"Check-up geral", c5);

			c1.getHistoricos().add(h1);
			c2.getHistoricos().add(h2);
			c3.getHistoricos().add(h3);
			c4.getHistoricos().add(h4);
			c5.getHistoricos().add(h5);

			p1.getConsultas().add(c1);
			p2.getConsultas().add(c2);
			p3.getConsultas().add(c3);
			p4.getConsultas().add(c4);
			p5.getConsultas().add(c5);


			pacienteRepo.saveAll(Arrays.asList(p1, p2, p3, p4, p5));
			consultaRepo.saveAll(Arrays.asList(c1, c2, c3, c4, c5));
			historicoRepo.saveAll(Arrays.asList(h1, h2, h3, h4, h5));

		};
	}
}
