DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS veiculos;
DROP TABLE IF EXISTS marcas;

CREATE TABLE usuarios
(
  id uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  nome character varying(100) NOT NULL,
  email character varying(70) NOT NULL,
  senha character varying(255) NOT NULL,
  CONSTRAINT pk_usuarios PRIMARY KEY(id)
);

CREATE TABLE marcas
(
  id uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  nome character varying(50) NOT NULL,
  CONSTRAINT pk_marcas PRIMARY KEY(id)
);

CREATE TABLE veiculos
(
  id uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  modelo character varying(50) NOT NULL,
  ano integer NOT NULL,
  valor decimal(10,2) NOT NULL,
  marca_id uuid NOT NULL,
  CONSTRAINT pk_veiculos PRIMARY KEY(id),
  constraint fk_marcas
     foreign key (marca_id) 
     REFERENCES marcas (id)
);
