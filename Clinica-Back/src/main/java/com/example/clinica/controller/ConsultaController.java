package com.example.clinica.controller;

import com.example.clinica.entity.Consulta;
import com.example.clinica.service.ConsultaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/consulta")
public class ConsultaController {
    private final ConsultaService consultaService;

    public ConsultaController(ConsultaService consultaService) {
        this.consultaService = consultaService;
    }

    @GetMapping
    public List<Consulta> getAll() {
        List<Consulta> cons = consultaService.listarConsultasAtivas();
        return cons;
    }

    @PostMapping
    public Consulta create(@RequestBody Consulta consulta) {
        return consultaService.salvarConsulta(consulta);
    }

    @PutMapping("/{id}")
    public Consulta update(@PathVariable Long id, @RequestBody Consulta consulta) {
        consulta.setId(id);
        return consultaService.atualizarConsulta(consulta);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        consultaService.excluirConsulta(id);
    }

    @GetMapping("/paciente/{pacienteId}")
    public List<Consulta> getById(@PathVariable Long pacienteId) {
        return consultaService.buscarConsultaPorIdPaciente(pacienteId);
    }

    @GetMapping("/paciente/{pacienteId}/todas")
    public List<Consulta> getTodasConsultasPorPaciente(@PathVariable Long pacienteId) {
        return consultaService.buscarTodasConsultasPorPaciente(pacienteId);
    }

}
