var express = require('express');

var bodyParser = require('body-parser')
var	Sequelize = require('sequelize')


var app = express();

app.use(bodyParser.json())

app.use(express.static('public'))
app.use('/admin', express.static('admin'))

//app.get('/', function(req, res) {
 
   // res.send('Welcome to Assignment Manager');
   // app.use('/admin', express.static('admin'))
 
//});
var	sequelize = new Sequelize('eventdb', 'root', '', { dialect : 'mysql', port : 3306})
var descriereEveniment = sequelize.define('descriereevent', {
    denumire: {
        type: Sequelize.STRING,
        validate: {
            len: [3,20]
        }, 
        allowNull: false
    }, 
    descriere: {
        type: Sequelize.TEXT, 
        validate: {
            len: [5,1000]
        }, 
        allowNull: false
    }, 
    data: {
        type: Sequelize.TEXT, 
         validate: {
            len: [5,10]
        }
        
    }
})

var adaugaEveniment = sequelize.define('event', {
    dataEveniment: {
        type: Sequelize.DATE,
        validate: {
             isDate: true
        }
    },
    detalii: {
        type: Sequelize.STRING,
        validate: {
            len: [3,8]
        },
        allowNull: false
        
    },
    numeUser: {
    	type: Sequelize.STRING,
    	validate: {
    		len:[5,30]
    	},
    	allowNull: false
    }, 
    email: {
    	type: Sequelize.STRING,
    	validate: {
    		isEmail:true
    	}
    }
})

adaugaEveniment.hasMany(descriereEveniment, {foreignKey: 'descriereEventId'})
descriereEveniment.belongsTo(adaugaEveniment, {foreignKey: 'descriereEventId'})


app.get('/create', function(req,res){
    sequelize
        .sync({
            force: true
        })
        .then(function(){
            res.status(201).send('created')
        })
        .catch(function(error){
            console.warn(error)
            res.status(500).send('not created')
        })
})

// Preia toate evenimentele existente
app.get('/events', function(req, res) {
	adaugaEveniment
		.findAll({attributes : ['id','dataEveniment','detalii','numeUser', 'email']})
		.then(function(events){
			res.status(200).send(events)
		})
		.catch(function(error){
			console.warn(error)
			res.status(500).send('not created')
		})
})

// Cauta un event dupa id
app.get('/events/:id', function(req, res) {
	var id = req.params.id
	adaugaEveniment
		.find({where : {id : id},  attributes : ['id','dataEveniment','detalii']})
		.then(function(event){
			res.status(200).send(event)
		})
		.catch(function(error){
			console.warn(error)
			res.status(500).send('not created')
		})
})

// Adauga un event
app.post('/events',function(req,res){
	descriereEveniment
		.create(req.body)
		.then(function(){
			res.status(201).send('created')
		})
		.catch(function(error){
			console.warn(error)
			res.status(500).send('not created')
		})
})


// Modifica un event
app.put('/events/:id',function(req,res){
	var id = req.params.id
	descriereEveniment
		.find({where : {id : id}})
		.then(function(order){
			return order.updateAttributes(req.body)
		})
		.then(function(){
			res.status(201).send('updated')
		})
		.catch(function(error){
			console.warn(error)
			res.status(500).send('not created')
		})
})

//Sterge un event
app.delete('/events/:id',function(req,res){
	var id = req.params.id
	descriereEveniment
		.find({where : {id : id}})
		.then(function(event){
			event.destroy()
		})
		.then(function(){
			res.status(201).send('updated')
		})
		.catch(function(error){
			console.warn(error)
			res.status(500).send('not created')
		})
})


// Preia din ziua cu id-ul X, toate evenimentele
app.get('/events/:id/descriereevent', function(req, res) {
	var id = req.params.id
	descriereEveniment
		.find({where : {id : id}, include : [adaugaEveniment]})
		.then(function(event){
			return event.getEvents()
		})
		.then(function(descrieteevent){
			console.warn(descrieteevent)
			res.status(200).send(descrieteevent)
		})
		.catch(function(error){
			console.warn(error)
			res.status(500).send('error')
		})
})

// Adauga un event Y la ziua X
app.post('/events/:id/descriereevent', function(req, res) {
	var id = req.params.id
	descriereEveniment
		.find({where : {id : id}})
		.then(function(order){
			return adaugaEveniment.create({
				denumire : req.body.denumire,
				descriere : req.body.descriere,
				pret : req.body.data,
				descriereEventId : event.id
			})
		})
		.then(function(){
			res.status(201).send('created')
		})
		.catch(function(error){
			console.warn(error)
			res.status(500).send('error')
		})
})

// Modifica un event Y la ziua X
app.put('/events/:id/descriereevent/:dId', function(req, res) {
	var dId = req.params.dId
	adaugaEveniment
		.find({where : {id : dId}})
		.then(function(descriereevent){
			descriereevent.denumire = req.body.denumire
			descriereevent.descriere = req.body.descriere
			descriereevent.data = req.body.pret
			return descriereevent.save(['body','content'])
		})
		.then(function(){
			res.status(201).send('updated')
		})
		.catch(function(error){
			console.warn(error)
			res.status(500).send('not created')
		})
})

//Sterge un event din ziua X
app.delete('/events/:id/descriereevent/:dId', function(req, res) {
	var dId = req.params.dId
	adaugaEveniment
		.find({where : {id : dId}})
		.then(function(descriereevent){
			descriereevent.destroy()
		})
		.then(function(){
			res.status(201).send('deleted')
		})
		.catch(function(error){
			console.warn(error)
			res.status(500).send('not created')
		})
})


app.listen(8080, function(err) {
 
    if (!err)
        console.log("Site is live");
    else console.log(err)
 
});