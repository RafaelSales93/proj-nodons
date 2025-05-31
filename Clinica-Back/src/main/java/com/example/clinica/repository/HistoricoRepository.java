package com.example.clinica.repository;

import com.example.clinica.entity.Historico;
import com.example.clinica.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HistoricoRepository extends JpaRepository<Historico, Long> {
    @Query("SELECT h FROM Historico h WHERE h.ativo = true")
    List<Historico> findAllAtivos();

    List<Historico> findByAtivoTrue();

    List<Historico> findByConsultaPacienteNomeLike(String nomePaciente);

    List<Historico> findByConsultaIdAndAtivoTrue(Long idConsulta);

    @Query("SELECT h FROM Historico h WHERE LOWER(h.descricao) LIKE LOWER(CONCAT('%', :descricao, '%')) AND h.ativo = true")
    List<Historico> listarDescricaoHistorico(String descricao);
}