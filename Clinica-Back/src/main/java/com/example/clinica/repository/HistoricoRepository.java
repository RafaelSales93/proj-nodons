package com.example.clinica.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.clinica.model.Historico;

public interface HistoricoRepository extends JpaRepository<Historico, Long> {
 
}