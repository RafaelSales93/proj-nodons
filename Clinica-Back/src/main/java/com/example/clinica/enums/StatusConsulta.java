package com.example.clinica.enums;

public enum StatusConsulta {

    ABERTA("Aberta"),
    AGENDADO("Agendado"),
    CONCLUIDA("Concluída"),
    CANCELADA("Cancelada");

    private final String descricao;

    StatusConsulta(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
