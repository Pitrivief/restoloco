insert into resto(name, bio, email, phone) values ('test1',  'restaurant-bio', 'contact@test1.fr', '0231443660');

insert into link(`type`, resto_id, description, url) values ('Deliveroo', 1, 'test1', 'www.deliveroo.fr/test1');

insert into schedule(closed, resto_id, day, lunch_start, lunch_end, dinner_start, dinner_end) values (0, 1, 'MONDAY', '12:15:00', '15:00:00', '18:00:00','22:00:00');

