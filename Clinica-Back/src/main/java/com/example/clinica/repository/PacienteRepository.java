package com.example.clinica.repository;

import com.example.clinica.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    @Query("SELECT p FROM Paciente p WHERE p.ativo = true")
    List<Paciente> findAllAtivos();

    @Modifying
    @Transactional
    @Query("UPDATE Paciente p SET p.ativo = true WHERE p.id = :id")
    void reativarPaciente(Long id);
}
