create or alter procedure signUp(@username varchar(100),@email varchar(100),@password varchar(100))
as
begin
insert into userTest(username, email, password)
values(@username, @email, @password)
end