package com.example.clinica.service;

import com.example.clinica.entity.Historico;
import com.example.clinica.repository.HistoricoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HistoricoService {

    private final HistoricoRepository repository;

    public HistoricoService(HistoricoRepository repository) {
        this.repository = repository;
    }

    public List<Historico> listarHistoricoAtivos() {
        return repository.findAllAtivos();
    }

    public List<Historico> listarDescricaoHistorico(String descricaoConsulta) {
        return repository.listarDescricaoHistorico(descricaoConsulta);
    }

    public List<Historico> listarHistoricoPor(String nomePaciente) {
        return repository.findByConsultaPacienteNomeLike(nomePaciente);
    }

    public List<Historico> getHistoricoByIdConsulta(Long idConsulta) {
        return repository.findByConsultaIdAndAtivoTrue(idConsulta);
    }

}
