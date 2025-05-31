package com.example.clinica.controller;

import com.example.clinica.entity.Historico;
import com.example.clinica.service.HistoricoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/historico")
public class HistoricoController {
    private final HistoricoService historicoService;

    public HistoricoController(HistoricoService historicoService) {
        this.historicoService = historicoService;
    }

    @GetMapping()
    public List<Historico> getAllHistorico() {
        return historicoService.listarHistoricoAtivos();
    }

    @GetMapping("/paginado")
    public List<Historico> getHistoricoPor(@RequestParam String nomePaciente) {
        return historicoService.listarHistoricoPor(nomePaciente);
    }

    @GetMapping("/{idConsulta}")
    public List<Historico> getHistoricoByIdConsulta(@PathVariable Long idConsulta) {
        return historicoService.getHistoricoByIdConsulta(idConsulta);
    }

    @GetMapping("/descricao")
    public List<Historico> getByDescricao(@RequestParam String descricao) {
        return historicoService.listarDescricaoHistorico(descricao);
    }
}
