create or alter procedure getUserById(@id varchar(100))
as
begin
insert into userTest(id)
values(@id)
end