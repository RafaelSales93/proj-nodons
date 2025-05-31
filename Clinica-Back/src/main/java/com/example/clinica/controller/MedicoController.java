package com.example.clinica.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.clinica.model.Medico;
import com.example.clinica.service.MedicoService;

@RestController
@RequestMapping("api/medico")
public class MedicoController {

	   private final MedicoService medicoService;

	    public MedicoController(MedicoService medicoService) {
	        this.medicoService = medicoService;
	    }


	    @GetMapping("/{id}")
	    public ResponseEntity<Medico> buscarMedico(@PathVariable Long id) {
	    	Medico medico = medicoService.buscarMedicoPorId(id);
	        return medico != null ? ResponseEntity.ok(medico) : ResponseEntity.notFound().build();
	    }


	    @PostMapping
	    public Medico criarMedico(@RequestBody Medico medico) {
	        return medicoService.salvarMedico(medico);
	    }

	    @PutMapping("/atualizar/{id}")
	    public Medico atualizarMedico(@RequestBody Medico medico) {
	        return medicoService.salvarMedico(medico);
	    }


	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> excluirMedico(@PathVariable Long id) {
	    	medicoService.excluirMedico(id);
	        return ResponseEntity.noContent().build();
	    }

	}