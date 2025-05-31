CREATE TABLE bd_clinica.tb_consulta (
    id INT NOT NULL AUTO_INCREMENT,
    data_cadastro DATE NOT NULL,
    descricao VARCHAR(5000) NOT NULL,
    medico_id INT NOT NULL,
    status VARCHAR(30) NOT NULL,
    paciente_id INT NOT NULL,
    CONSTRAINT consulta_pk PRIMARY KEY (id),
    CONSTRAINT consulta_medico_fk FOREIGN KEY (medico_id) REFERENCES bd_clinica.tb_medico(id),
    CONSTRAINT consulta_paciente_fk FOREIGN KEY (paciente_id) REFERENCES bd_clinica.tb_paciente(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;