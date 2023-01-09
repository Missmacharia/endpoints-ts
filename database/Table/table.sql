-- create database test
-- go

-- create table userTest(
-- username varchar(100) not null,
-- email varchar(100) unique not null,
-- password varchar(100) not null
-- )

-- create or alter procedure signUp(@username varchar(100),@email varchar(100),@password varchar(100))
-- as
-- begin
-- insert into userTest(username, email, password)
-- values(@username, @email, @password)
-- end

-- create or alter procedure login(@email varchar(100),@password varchar(100))
-- as
-- begin
-- insert into userTest(email, password)
-- values(@email, @password)
-- end