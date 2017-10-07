// APPLICATION VARS
var express 			= require("express"),
	app 				= express(), // MAIN APPLICATION
	// http				= require("http-request"),
	bodyParser 			= require("body-parser"),
	mongoose 			= require("mongoose"),
	flash				= require("connect-flash"),
	// Models
	User				= require("./models/user"),
	Educator 			= require("./models/educator"),
	Comment 			= require("./models/comment"),
	// SEED Data
	seedDb				= require("./seeds"),
	// authetication packages
	passport 			= require("passport"),
	LocalStrategy		= require("passport-local"),
	// for edit conversion to POST requests
	methodOverride		= require("method-override")

// ROUTING REFACTORING VARS
var commentRoutes 		= require("./routes/comments"),
	educatorRoutes		= require("./routes/educators"),
	// indexRoutes includes authentication routes
	indexRoutes			= require("./routes/index"),
	bitlyRoutes			= require("./routes/bitly")

// CONNECT TO DB
mongoose.Promise = global.Promise; // fixing deprecation bug on v4.11 and beyond
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/edumate");

// bodyParser package lets app use post data from views
app.use(bodyParser.urlencoded({extended:true}));

// methodOverride is node js package to give edit functionality by converting to appropriate POST Restful route
app.use(methodOverride("_method"));

// ejs engine translates all .ejs files without need for .ejs at end of filenames
app.set("view engine", "ejs"); 
app.use(express.static(__dirname + "/public")); // for stylesheet .css

// Flash package to display user authentication success and error messages in bootstrap
// Should come BEFORE passport configuration
app.use(flash());

// activate seed data
seedDb();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Chicago Albuquerque Taipei Ithaca Champaign",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MIDDLEWARE TO ADD VARs TO VIEWS - NAVBAR partials/header and Edit and Delete buttons
// not sure but this seems to send as encrypted cookie 
app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.flashPackageErrorMessage = req.flash("error");
	res.locals.flashPackageSuccessMessage = req.flash("success");
	next();
});

// ROUTING REFACTORING USAGE - must be after middleware for currentUser var pass through to header view
app.use("", indexRoutes);
app.use("/educators", educatorRoutes);
app.use("/educators/:id/comments", commentRoutes);
app.use("", bitlyRoutes);


// http.get('http://www.edamate.com/educators', function (err, res) {
// 	if (err) {
// 		console.error(err);
// 		return;
// 	}
	
// 	console.log(res.code, res.headers, res.buffer.toString());
// });


// END - LISTEN ON PORT AND IP
app.listen(process.env.PORT || 3000, process.env.IP, function () {
	console.log("EdaMate server has started!")
});


// LANDING,			GET,		/

// EDUCATORS CRUD Routes
// INDEX, 			GET, 		/educators
// NEW, 			POST, 		/educators
// NEW GET FORM, 	GET, 		/educators/new
// SHOW, 			GET, 		/educators/:id
// EDIT,		 	PATCH, 		/educators/:id
// DELETE, 			DELETE,		/educators/:id
// EDIT GET FORM, 	GET, 		/educators/:id/edit

// COMMENTS CRUD Routes -> EDUCATORS
// NEW,			 	POST, 		/educators/:id/comments
// NEW GET FORM,	GET, 		/educators/:id/comments/new
