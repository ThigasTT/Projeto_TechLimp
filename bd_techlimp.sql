create database TechLimp;
use TechLimp;

create table if not exists CEP (
id_cep int auto_increment,
cep char(8) not null unique,
logradouro varchar (255) not null,
bairro varchar (100) ,
cidade varchar (100) default 'São Paulo',
uf char(2) default 'SP'
);
create table if not exists Usuario(
id_user int auto_increment,
id_cep int not null unique,
nome_user varchar (50) not null,
telefone_celular_user char(11) not null,
email_user varchar (50) not null,
senha_user varchar(100) not null,
primary key (id_user),
complemento varchar(20),
foreign key (id_cep) references CEP (id_cep)
);

create table if not exists Ponto_Descarte(
id_ponto int auto_increment,
id_cep int auto_increment unique,
primary key (id_ponto),

foreign key (id_cep) references CEP (id_cep)
);