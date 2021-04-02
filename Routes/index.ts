// Express config
import express from 'express';
export const router = express.Router();

// Contact model
import * as ContactModel from "../Models/contact";
// Alias for quick reference to Contact model
const Contact = ContactModel.Model;

/* GET home page - with / */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home', page: 'home', displayName: '' });
});

/* GET home page - with /home */
router.get('/home', function (req, res, next) {
  res.render('index', { title: 'Home', page: 'home', displayName: '' });
});

/* GET about page - with /about */
router.get('/about', function (req, res, next) {
  res.render('index', { title: 'About Us', page: 'about', displayName: '' });
});

/* GET services page - with /services */
router.get('/services', function (req, res, next) {
  res.render('index', { title: 'Our Services', page: 'services', displayName: '' });
});

/* GET projects page - with /projects */
router.get('/projects', function (req, res, next) {
  res.render('index', { title: 'Our Projects', page: 'projects', displayName: '' });
});

/* GET contact page - with /contact */
router.get('/contact', function (req, res, next) {
  res.render('index', { title: 'Contact Us', page: 'contact', displayName: '' });
});

/* GET login page - with /login */
router.get('/login', function (req, res, next) {
  res.render('index', { title: 'Login', page: 'login', displayName: '' });
});

/* GET login page - with /login */
router.post('/login', function (req, res, next) {
  res.redirect('/contact-list');
});


/* GET register page - with /register */
router.get('/register', function (req, res, next) {
  res.render('index', { title: 'Register', page: 'register', displayName: '' });
});

/* temporary routes - mocking up login / register and contact-list related pages */
/* GET register page - with /register */
router.get('/contact-list', function (req, res, next) {
  //res.render('index', { title: 'Contact List', page: 'contact-list', displayName: 'temp'  });
  Contact.find(function (err, contacts) {
    if (err) {
      return console.error(err);
    }

    res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contacts, displayName: 'temp' });
  })

});

/* GET logout page - with /login */
router.get('/logout', function (req, res, next) {
  res.render('index', { title: 'Logout', page: 'logout', displayName: '' });
});

// EDIT PAGE ROUTES
/* GET display edit/:id page - with edit/:id */
router.get('/edit/:id', function (req, res, next) {

  let id = req.params.id;

  // Pass id to the database to retrieve existing record data
  Contact.findById(id, {}, {}, (err, contactToEdit) => {

    if (err) {
      console.error(err);
      res.end(err);
    }

    // Show edit view with data
    res.render('index', { title: 'Edit', page: 'edit', contact: contactToEdit, displayName: '' })
  });

  //res.render('index', { title: 'Edit', page: 'edit', displayName: '' });
});

/* POST process edit/:id page - with edit/:id */
router.post('/edit/:id', function (req, res, next) {

  // Retrieve contact's id
  let id = req.params.id;

  // Instantiate a new contact
  let updatedContact = new Contact({
    "_id": id,
    "FullName": req.body.FullName,
    "ContactNumber": req.body.ContactNumber,
    "EmailAddress": req.body.EmailAddress
  })

  Contact.updateOne({ _id: id }, updatedContact, {}, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.redirect('/contact-list');
  });
});

// ADD PAGE ROUTES
/* GET display add page - with /add */
router.get('/add', function (req, res, next) {
  res.render('index', { title: 'Add', page: 'edit', contact: '', displayName: '' });
});

/* POST process add page - with /add */
router.post('/add/', function (req, res, next) {

  // Instantiate a new contact
  let newContact = new Contact({
    "FullName": req.body.FullName,
    "ContactNumber": req.body.ContactNumber,
    "EmailAddress": req.body.EmailAddress
  })

  // Insert new contact into database
  Contact.create(newContact, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
  });
  res.redirect('/contact-list');
});

/* DELETE process delete/:id page - with delete/:id */
router.get('/delete/:id', function (req, res, next) {

  let id = req.params.id;

  Contact.remove({ _id: id }, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.redirect('/contact-list');
  });
});



