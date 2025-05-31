package com.example.clinica.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import com.example.clinica.model.Medico;
import com.example.clinica.repository.MedicoRepository;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
@Validated
@Service
public class MedicoService {

    private final MedicoRepository medicoRepository;

    public MedicoService(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }

    public Medico buscarMedicoPorId(Long id) {
        return medicoRepository.findById(id).orElse(null);
    }

    public Medico salvarMedico(Medico medico) {
        return medicoRepository.save(medico);
    }

    public Medico atualizarMedico(Medico medico) {
        return medicoRepository.save(medico);
    }


    @Transactional
    public void excluirMedico(@NotNull @Positive Long id) {
    	medicoRepository.delete(medicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException()));
    }

}
