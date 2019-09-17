use lawn_service;
drop table if exists `mowers`;
drop table if exists `jobs`;
drop table if exists `clients`;
drop table if exists `types`;
drop table if exists `addresses`;

create table addresses (
	id int auto_increment primary key,
	address1 varchar(40) not null,
	address2 varchar(40),
	city varchar(40) not null,
	state varchar(40) not null,
	zipcode varchar(40) not null,
	deleted tinyint(1) not null default 0	
);

create table clients (
	id int auto_increment primary key,
	firstname varchar(30) not null,
	lastname varchar(30),
	phone varchar(14) not null,
	email varchar(40),
	deleted tinyint(1) not null default 0,
	billing int not null default 0
);

create table types (
	id int auto_increment primary key,
	type varchar(20) not null
);
insert into types (type) values ("mow");
insert into types (type) values ("mulch");
insert into types (type) values ("landscape");

create table jobs
(
	id int auto_increment primary key,
	job_date date not null,
	cost decimal not null,
	complete tinyint(1) not null default 0,
	address_id int not null,
	type_id int not null,
	client_id int not null,
	deleted tinyint(1) not null default 0,
	foreign key fk_client(client_id) references clients(id),
	foreign key fk_addr(address_id) references addresses(id),
	foreign key fk_type(type_id) references types(id)
);

create table billing (
    id int auto_increment primary key,
	item varchar(40) not null,
	cost decimal not null,
	quantity int not null default 1,
	job_id int not null,
	foreign key fk_billing(job_id) references jobs(id) 	
);

create table mowers (
	id int auto_increment primary key,
	start_date timestamp not null default current_timestamp,
	email varchar(40) not null,
	user_hash varchar(256) 
	
); 
