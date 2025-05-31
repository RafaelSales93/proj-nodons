package com.example.clinica.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import com.example.clinica.model.Paciente;
import com.example.clinica.repository.PacienteRepository;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
@Validated
@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    public Paciente buscarPacientePorId(Long id) {
        return pacienteRepository.findById(id).orElse(null);
    }

    public Paciente salvarPaciente(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    public Paciente atualizarPaciente(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }


    @Transactional
    public void excluirPaciente(@NotNull @Positive Long id) {
        pacienteRepository.delete(pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException()));
    }

}
