CREATE TABLE bd_clinica.tb_paciente (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    data_nascimento DATE NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    telefone VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    cpf VARCHAR(15) NOT NULL,
    sexo VARCHAR(30) NOT NULL,
    CONSTRAINT paciente_pk PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;