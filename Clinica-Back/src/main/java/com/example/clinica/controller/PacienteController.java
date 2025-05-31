package com.example.clinica.controller;

import com.example.clinica.entity.Paciente;
import com.example.clinica.service.PacienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/paciente")
public class PacienteController {

    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }


    @GetMapping
    public List<Paciente> listarPacientes() {
        return pacienteService.listarPacientesAtivos();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Paciente> buscarPaciente(@PathVariable Long id) {
        Paciente paciente = pacienteService.buscarPacientePorId(id);
        return paciente != null ? ResponseEntity.ok(paciente) : ResponseEntity.notFound().build();
    }


    @PostMapping
    public Paciente criarPaciente(@RequestBody Paciente paciente) {
        return pacienteService.salvarPaciente(paciente);
    }

    @PutMapping("/atualizar/{id}")
    public Paciente atualizarPaciente(@RequestBody Paciente paciente) {
        return pacienteService.salvarPaciente(paciente);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirPaciente(@PathVariable Long id) {
        pacienteService.excluirPaciente(id);
        return ResponseEntity.noContent().build();
    }


    @PutMapping("/reativar/{id}")
    public ResponseEntity<Void> reativarPaciente(@PathVariable Long id) {
        pacienteService.reativarPaciente(id);
        return ResponseEntity.noContent().build();
    }
}