package com.example.clinica.repository;

import com.example.clinica.entity.Consulta;
import com.example.clinica.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    List<Consulta> findByAtivoTrue();

    @Query("SELECT c FROM Consulta c WHERE c.ativo = true and c.paciente.id = :pacienteId")
    List<Consulta> buscarConsultaPorIdPaciente(Long pacienteId);

    @Query("SELECT c FROM Consulta c WHERE c.paciente.id = :pacienteId")
    List<Consulta> buscarTodasConsultasPorPacienteIncluindoInativas(Long pacienteId);

}
