CREATE TABLE usuarios (
    id serial PRIMARY KEY,
    username varchar(50),
    password varchar(50)
)

CREATE TABLE contas (
    id serial PRIMARY KEY,
    banco varchar(20),
    agencia varchar(20),
    conta_corrente varchar(20),
    receber real,
    pagar real,
    abertura date DEFAULT CURRENT_DATE,
    deleted boolean DEFAULT false
)