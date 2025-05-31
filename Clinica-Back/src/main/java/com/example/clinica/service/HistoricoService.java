package com.example.clinica.service;

import org.springframework.stereotype.Service;

import com.example.clinica.repository.HistoricoRepository;

@Service
public class HistoricoService {

    private final HistoricoRepository repository;

    public HistoricoService(HistoricoRepository repository) {
        this.repository = repository;
    }

}
