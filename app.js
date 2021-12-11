const app = require('./config/bootstrap');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const RelationsController = require('./controllers/RelationsController');


/*
	/auth authorizes the user and returns a JWT
	with a payload of the user if successfully authenticated
	/forgot not implemented yet (needs security verifications)
*/

/*app.post('/upload', function (req, res, next) {
	let sampleFile;
	let uploadPath;

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	sampleFile = req.files.fileKey;
	filename = Date.now() + sampleFile.name;
	uploadPath = __dirname + '/files/' + filename;

	// Use the mv() method to place the file somewhere on your server
	sampleFile.mv(uploadPath, function (err) {
		if (err)
			return res.status(500).send(err);
		res.status(201).json({ url: `http://localhost:4000/${filename}`}); 
	});
});*/

app.post('/auth', AuthController.authenticate);
app.post('/forgot', AuthController.forgot);

/*
	To register a new user
	Request Body: email, password, firstname and lastname
	Returns HTTP Status Code 201 if the creation was successful
	Returns HTTP Status Code 400 if the email already exists
*/
app.post('/user/new', UserController.create);

/*
	To retrieve the publicly visible data of a user
	Endpoint requires ID (eg: /user/1239123912)
	Returns firstname, lastname, posts (array of ids) 
	and likedPosts (array of ids)
*/
app.get('/user/:id', UserController.read);
app.get('/user/:id/relations', UserController.readRelations);
app.get('/user/:id/reactions', UserController.readReactions);

/*
	Use case: get all data of currently logged in user (except password)
	Without their email and password
*/
app.get('/user/me', UserController.read);
app.get('/user/me/relations', UserController.readRelations);
app.get('/user/me/reactions', UserController.readReactions);


/*
	To update a user's data
	Request body: can be everything except different ID
	Returns 200 OK if changes are applied
	Returns 400 if not
*/
app.put('/user/me', UserController.update);

/*
	Delete the current user's profile
	Returns 202 if user was successfuly deleted
*/
app.delete('/user/me', UserController.delete);

// Relations CRUD
app.post('/relation', PostController.create);
app.post('/relation/:id/react', PostController.createReaction);

app.get('/relation', PostController.read);
app.get('/relation/:id', PostController.read);
app.get('/relation/:id/likes', PostController.readRelation);

app.put('/relation/:id', PostController.update);
app.delete('/relation/:id', PostController.delete);
app.delete('/relation/:id/likes', PostController.deleteRelation);

app.listen(4000, () => {
	console.log('API has started'); 
});