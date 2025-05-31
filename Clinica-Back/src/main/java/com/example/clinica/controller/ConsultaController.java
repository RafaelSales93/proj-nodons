package com.example.clinica.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.clinica.model.Consulta;
import com.example.clinica.service.ConsultaService;

@RestController
@RequestMapping("api/consulta")
public class ConsultaController {
    
	private final ConsultaService consultaService;

    public ConsultaController(ConsultaService consultaService) {
        this.consultaService = consultaService;
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


}
