package com.example.clinica.entity;

import com.example.clinica.enums.StatusConsulta;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Consulta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private String medico;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusConsulta status;

    private boolean ativo = true;

    @ManyToOne
    @JoinColumn(name = "paciente_fk", nullable = false)
    private Paciente paciente;

    @OneToMany(mappedBy = "consulta", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Historico> historicos = new ArrayList<>();

    public Consulta(Long id, LocalDate data, String descricao, String medico, StatusConsulta status, boolean ativo, Paciente paciente) {
        this.id = id;
        this.data = data;
        this.descricao = descricao;
        this.medico = medico;
        this.status = status;
        this.ativo = ativo;
        this.paciente = paciente;
    }
}
