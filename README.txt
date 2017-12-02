# WEBTECH-PRJ
Appointment manager integrat cu Google calendar

Aplicatie de tip calendar care permite salvarea de evenimente, intalniri cu clientii, zile de nastere. Aplicatia vine cu optiunea integrata de notificari pentru a anunta utilizatorii de deadline-urile anumitor taskuri sau de anumite intalniri/sedinte, etc.

Clone the Git project to my Cloud9 repository
* git clone https://github.com/MariaGeorgianaStoica/WEBTECH-PRJ

Set up the node js server and the package.json file
* npm install express
* npm init

Set up host and port
* create server.js

Configure and install database in c9
* npm i mysql -g
Root User: georgiana16
Database Name: c9
* mysql-ctl start
Create table 'evenimente'
* mysql -u root
* mysql>use c9;
* mysql>create table evenimente(denumire varchar(20, data DATE);
* mysql> INSERT INTO evenimente (denumire, data) VALUES ('Sedinta HR','2017-06-15');

Made 2 pages for mode admin and public.
In server.js open index.html from each page
* app.use(express.static('public'))
* app.use('/admin', express.static('admin'))