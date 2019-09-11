create user 'lawnmowerman'@'10.0.0.%' identified by '67triumph';
grant select on *.* to 'lawnmowerman'@'10.0.0.%';
grant select, insert, update, delete on lawn_service.* to 'lawnmowerman'@'10.0.0.%';
flush privileges;