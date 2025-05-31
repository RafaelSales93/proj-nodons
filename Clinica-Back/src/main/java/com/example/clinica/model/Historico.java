package com.example.clinica.model;

import java.time.LocalDate;

import com.example.clinica.enums.StatusConsulta;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_historico", schema = "bd_clinica")
public class Historico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_criacao")
    private LocalDate data;

    @Column(name = "descricao")
    @Size(max = 5000)
    private String descricao;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusConsulta status;

    @ManyToOne
    @JoinColumn(name = "consulta_id")
    private Consulta consulta;
}