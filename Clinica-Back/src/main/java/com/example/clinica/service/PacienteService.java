package com.example.clinica.service;

import com.example.clinica.entity.Paciente;
import com.example.clinica.repository.PacienteRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.List;
@Validated
@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    public List<Paciente> listarPacientesAtivos() {
        return pacienteRepository.findAllAtivos();
    }

    public Paciente buscarPacientePorId(Long id) {
        return pacienteRepository.findById(id)
                .filter(Paciente::isAtivo)
                .orElse(null);
    }

    public Paciente salvarPaciente(Paciente paciente) {
        paciente.setAtivo(true);
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


    @Transactional
    public void reativarPaciente(Long id) {
        pacienteRepository.reativarPaciente(id);
    }
}
