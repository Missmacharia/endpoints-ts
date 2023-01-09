create or alter procedure login(@email varchar(100),@password varchar(100))
as
begin
insert into userTest(email, password)
values(@email, @password)
end