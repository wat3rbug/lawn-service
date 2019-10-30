use lawn_service;
drop table if exists `mowers`;
drop table if exists `jobs`;
drop table if exists `clients`;
drop table if exists `types`;
drop table if exists `addresses`;
drop table if exists `states`;
drop table if exists `expense_categories`;
drop table if exists `expenses`;
drop table if exists `machines`;
drop table if exists `maintenance`;

create table states (
	postal_code varchar(2) primary key,
	state varchar(20) not null
) engine = InnoDB;

insert into states (postal_code, state) values ('AL', 'Alabama');
insert into states (postal_code, state) values ('AK', 'Alaska');
insert into states (postal_code, state) values ('AS', 'American Samoa');
insert into states (postal_code, state) values ('AZ', 'Arizona');
insert into states (postal_code, state) values ('AR', 'Arkansas');
insert into states (postal_code, state) values ('CA', 'California');
insert into states (postal_code, state) values ('CO', 'Colorado');
insert into states (postal_code, state) values ('CT', 'Connecticut');
insert into states (postal_code, state) values ('DE', 'Delaware');
insert into states (postal_code, state) values ('DC', 'District of Columbia');
insert into states (postal_code, state) values ('FL', 'Florida');
insert into states (postal_code, state) values ('GA', 'Georgia');
insert into states (postal_code, state) values ('GU', 'Guam');
insert into states (postal_code, state) values ('HI', 'Hawaii');
insert into states (postal_code, state) values ('ID', 'Idaho');
insert into states (postal_code, state) values ('IL', 'Illinois');
insert into states (postal_code, state) values ('IN', 'Indiana');
insert into states (postal_code, state) values ('IA', 'Iowa');
insert into states (postal_code, state) values ('KS', 'Kansas');
insert into states (postal_code, state) values ('KY', 'Kentucky');
insert into states (postal_code, state) values ('LA', 'Louisiana');
insert into states (postal_code, state) values ('ME', 'Maine');
insert into states (postal_code, state) values ('MD', 'Maryland');
insert into states (postal_code, state) values ('MH', 'Marshall Islands');
insert into states (postal_code, state) values ('MA', 'Massachusetts');
insert into states (postal_code, state) values ('MI', 'Michigan');
insert into states (postal_code, state) values ('FM', 'Micronesia');
insert into states (postal_code, state) values ('MN', 'Minnesota');
insert into states (postal_code, state) values ('MS', 'Mississippi');
insert into states (postal_code, state) values ('MO', 'Missouri');
insert into states (postal_code, state) values ('MT', 'Montana');
insert into states (postal_code, state) values ('NE', 'Nebraska');
insert into states (postal_code, state) values ('NV', 'Nevada');
insert into states (postal_code, state) values ('NH', 'New Hampshire');
insert into states (postal_code, state) values ('NJ', 'New Jersey');
insert into states (postal_code, state) values ('NM', 'New Mexico');
insert into states (postal_code, state) values ('NY', 'New York');
insert into states (postal_code, state) values ('NC', 'North Carolina');
insert into states (postal_code, state) values ('ND', 'North Dakota');
insert into states (postal_code, state) values ('MP', 'Northern Marianas');
insert into states (postal_code, state) values ('OH', 'Ohio');
insert into states (postal_code, state) values ('OK', 'Oklahoma');
insert into states (postal_code, state) values ('OR', 'Oregon');
insert into states (postal_code, state) values ('PW', 'Palau');
insert into states (postal_code, state) values ('PA', 'Pennsylvania');
insert into states (postal_code, state) values ('PR', 'Puerto Rico');
insert into states (postal_code, state) values ('RI', 'Rhode Island');
insert into states (postal_code, state) values ('SC', 'South Carolina');
insert into states (postal_code, state) values ('SD', 'South Dakota');
insert into states (postal_code, state) values ('TN', 'Tennessee');
insert into states (postal_code, state) values ('TX', 'Texas');
insert into states (postal_code, state) values ('UT', 'Utah');
insert into states (postal_code, state) values ('VT', 'Vermont');
insert into states (postal_code, state) values ('VA', 'Virginia');
insert into states (postal_code, state) values ('VI', 'Virgin Islands');
insert into states (postal_code, state) values ('WA', 'Washington');
insert into states (postal_code, state) values ('WV', 'West Virginia');
insert into states (postal_code, state) values ('WI', 'Wisconsin');
insert into states (postal_code, state) values ('WY', 'Wyoming');

create table addresses (
	id int auto_increment primary key,
	address1 varchar(40) not null,
	address2 varchar(40),
	city varchar(40) not null,
	state varchar(40) not null,
	zipcode varchar(40) not null,
	-- foreign key fk_state(state) references state(postal_code),
	deleted tinyint(1) not null default 0
) engine = InnoDB;

create table clients (
	id int auto_increment primary key,
	firstname varchar(30) not null,
	lastname varchar(30),
	phone varchar(14) not null,
	email varchar(40),
	deleted tinyint(1) not null default 0,
	billing int not null default 0
) engine = InnoDB;

create table types (
	id int auto_increment primary key,
	type varchar(20) not null,
	deleted tinyint(1) not null default 0,
	uses_materials tinyint(1) not null default 0
) engine = InnoDB;
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
) engine = InnoDB;

create table billing (
    id int auto_increment primary key,
	item varchar(40) not null,
	cost decimal(10,2) not null,
	quantity int not null default 1,
	job_id int not null,
	deleted tinyint(1) not null default 0,
	foreign key fk_billing(job_id) references jobs(id) 	
) engine = InnoDB;

create table mowers (
	id int auto_increment primary key,
	start_date timestamp not null default current_timestamp,
	email varchar(40) not null,
	user_hash varchar(256) 
	
) engine = InnoDB; 

create table expense_categories (
	id int auto_increment primary key,
	expense_type varchar(40) not null,
	isDeleted tinyint(1) not null default 0
) engine = InnoDB;

create table expenses (
	id int auto_increment primary key,
	expense_date date not null,
	name varchar(40) not null,
	expense_category int not null,
	foreign key fk_expense(expense_category) references expense_categories(id),
	unit_cost decimal(10,2) not null,
	quantity int not null default 1,
	isDeleted tinyint(1) not null default 0
) engine = InnoDB;

create table machines (
	id int auto_increment primary key,
	name varchar(40) not null,
	isDeleted tinyint(1) not null default 0
) engine = InnoDB;

create table maintenance (
	id int auto_increment primary key,
	machine_name int not null,
	foreign key fk_machine(machine_name) references machines(id),
	description varchar(100) not null,
	duration_days int not null default 7,
	last_checked date,
	isDeleted tinyint(1) not null default 0
) engine = InnoDB;

create trigger after_billing_delete
	after delete on billing
	for each row
	update jobs set cost = (select sum(cost * quantity) from billing
		where deleted = 0 and billing.job_id = OLD.job_id) where jobs.id = OLD.job_id;

create trigger after_billing_update 
	after update on billing 
	for each row 
	update jobs set cost =(select sum(cost * quantity) from billing 
		where deleted = 0  and billing.job_id = OLD.job_id) where jobs.id = OLD.job_id;
		
create trigger after_billing_insert
	after insert on billing 
	for each row 
	update jobs set cost =(select sum(cost * quantity) from billing 
		where deleted = 0  and billing.job_id = NEW.job_id) where jobs.id = NEW.job_id;
		
create view v_profit_loss as
	select job_date as date, cost, types.type, addresses.address1 as name_or_location
	from jobs join types on jobs.type_id = types.id
	join addresses on jobs.address_id = addresses.id
	union
	select expense_date as date, (unit_cost * quantity * -1) as cost, expense_categories.expense_type, name  
	from expenses join expense_categories on expenses.expense_category = expense_categories.id;
