package com.example.clinica.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "tb_paciente", schema = "bd_clinica")
public class Paciente {
   
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nome")
    @Size(max = 200)
    private String nome;

    @NotNull
    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @NotNull
    @Size(max = 200)
    @Column(name = "endereco")
    private String endereco;
    
    @NotNull
    @Size(max = 200)
    @Column(name = "telefone")
    private String telefone;

    @NotNull
    @Size(max = 200)
    @Column(name = "email")
    private String email;

    @NotNull
    @Size(max = 15)
    @Column(name = "cpf")
    private String cpf;

    @NotNull
    @Size(max = 30)
    @Column(name = "sexo")
    private String sexo;
    

    @JsonIgnore
    @OneToMany(mappedBy = "paciente", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Consulta> consultas = new ArrayList<>();


}

