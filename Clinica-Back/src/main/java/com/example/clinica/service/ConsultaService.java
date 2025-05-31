package com.example.clinica.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.clinica.enums.StatusConsulta;
import com.example.clinica.model.Consulta;
import com.example.clinica.model.Paciente;
import com.example.clinica.repository.ConsultaRepository;
import com.example.clinica.repository.PacienteRepository;

@Service
public class ConsultaService {
    private final ConsultaRepository consultaRepository;
    private final PacienteRepository pacienteRepository;

    public ConsultaService(ConsultaRepository consultaRepository, PacienteRepository pacienteRepository) {
        this.consultaRepository = consultaRepository;
        this.pacienteRepository = pacienteRepository;
    }

    public Consulta salvarConsulta(Consulta consulta) {
        Paciente paciente = pacienteRepository.findById(consulta.getPaciente().getId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));
        consulta.setPaciente(paciente);
        consulta.setStatus(StatusConsulta.AGENDADO);

        return consultaRepository.save(consulta);
    }

    public Consulta atualizarConsulta(Consulta consulta) {
        Consulta existente = consultaRepository.findById(consulta.getId())
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada"));

        existente.setData(consulta.getData());
        existente.setDescricao(consulta.getDescricao());
        existente.setMedico(consulta.getMedico());
        existente.setStatus(consulta.getStatus());

        if (consulta.getPaciente() != null && consulta.getPaciente().getId() != null) {
            Paciente paciente = pacienteRepository.findById(consulta.getPaciente().getId())
                    .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));
            existente.setPaciente(paciente);
        }

        return consultaRepository.save(existente);
    }


    public void excluirConsulta(Long id) {
        Optional<Consulta> consultaOptional = consultaRepository.findById(id);
        if (consultaOptional.isPresent()) {
            Consulta consulta = consultaOptional.get();
            consultaRepository.save(consulta);
        } else {
            throw new RuntimeException("Consulta não encontrada!");
        }
    }


}
