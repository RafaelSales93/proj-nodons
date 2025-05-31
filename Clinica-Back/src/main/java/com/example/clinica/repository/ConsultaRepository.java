package com.example.clinica.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.clinica.model.Consulta;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    //List<Consulta> findByAtivoTrue();

   /* @Query("SELECT c FROM Consulta c WHERE c.ativo = true and c.paciente.id = :pacienteId")
    List<Consulta> buscarConsultaPorIdPaciente(Long pacienteId);*/


}
