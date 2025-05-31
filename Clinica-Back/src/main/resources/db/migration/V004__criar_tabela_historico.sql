CREATE TABLE bd_clinica.tb_historico (
    id INT NOT NULL AUTO_INCREMENT,
    data_criacao DATE NOT NULL,
    descricao VARCHAR(5000),
    status VARCHAR(30),
    consulta_id INT NOT NULL,
    CONSTRAINT historico_pk PRIMARY KEY (id),
    CONSTRAINT historico_consulta_fk FOREIGN KEY (consulta_id) REFERENCES bd_clinica.tb_consulta(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
