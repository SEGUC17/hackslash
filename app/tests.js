// REQUIRING SUPER TEST PACKAGE
var request = require('supertest');
// TESTING IS MADE ON THE LOCAL HOST ON PORT 8080
request = request('http://localhost:8080');

/*
STEPS TO RUN ALL THE TESTS
1- Put this version of RegsiterController in your Work Space (Because this version sends mails with the localhost url).
2- Fill all the variables below except token, t2. (don't make the two usernames or passwords or emails equal).
3- Run Tests 1, 2, 3 only. (Comment all other tests) (Don't comment the two small functions in the bottom) (Check That they passed in the Console).
4- Open the two Emails, copy the parts after http://localhost:8080/email-verification/
5- Verify Both emails using Test 4 by pasting what you copied after /email-verification/ (Check That Both of them passed in the Console).
6- Run Tests 5, 6 (Check That Both of them passed in the Console).
7- Login Again from Postman or from the Local Version of the Website and copy the Tokens Sent by the Server and Paste them below in (Token, t2).
8- Run Test 7 (Check That it passed in the Console).
9- Run Test 8 (You Can Modify the newPassword parameter as you want), copy the newPassword that you have written and paste it in (p1) Below and Repeat Point 7 Again.
10- Run Tests [9,26] (Check That They passed in the Console).
11- Repeat Point 7.
12- Run Tests [27,29] (Check That Both of them passed in the Console).
*/

var
u1 = 'someUsername'            , u2 = u1 + '2',                                              // USERNAMES
p1 = 'somePassword'            , p2 = p1 + '2',                                              // PASSWORDS
e1 = 'oyasser826@gmail.com'    , e2 = 'oyaraouf@gmail.com',                                  // EMAILS
f1 = 'someFirstName'           , f2 = f1 + '2',                                              // FIRST NAMES
l1 = 'someLastName'            , l2 = l1 + '2';                                              // LAST NAMES
token = 'PutTheFirstTokenHere', t2 = 'PutTheSecondTokenHere',                                // TOKENS
type = '1', kind = 'Barn', kind_B = 'Tibetan', species_B = 'Llama', gender_B = 'male',       // INFO ABOUT A PET
species = 'Owl', gender = 'male', price = '2000', description = 'Buy my owll!';              // INFO ABOUT A PET

// REGISTERATION
// 1 FIRST USER IS REGISTERING
request.post('/register').send({username : u1, password : p1, email : e1, firstName : f1, lastName : l1})
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(1); else success(1);});
// 2 SECOND USER IS REGISTERING
request.post('/register').send({username : u2, password : p2, email : e2, firstName : f2, lastName : l2})
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(2); else success(2);});
// 3 FIRST USER WANTS US TO RESEND THE VERIFICATION MAIL
request.post('/resend-verification-code').send({email : e1})
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(3); else success(3);});
// 4 CLIENT IS VERIFYING HIS EMAIL. YOU MAY TRY ALSO GETTING (email-verification) BUT YOU WILL NEED TO CONCATENATE THE MAILED URL (LIKE THE ONE THAT I WAS TESTING WITH)
request.get('/email-verification/ZZ4sHY3LUxqU4P9GOixp7EhsYU9qr7XTWPs6R6o8qSnKBL2E')
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(4); else success(4);});


// LOGGING IN
// 5 FIRST USER IS LOGGING IN
request.post('/login').send({username : u1, password : p1})
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(5); else success(5);});
// 6 SECOND USER IS LOGGING IN
request.post('/login').send({username : u2, password : p2})
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(6); else success(6);});
// 7 FIRST USER FORGOT HIS PASSWORD
request.post('/forgetPassword').send({email : e1})
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(7); else success(7);});
// 8 FIRST USER IS RESETING HIS PASSWORD
request.post('/resetPassword').send({params:{token:token, password:{password : p1}},newPassword : p1})
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(8); else success(8);});

// POSTING
// 9 FIRST CLIENT POSTS (SELL). YOU MAY TRY POSTING INTO (/post/sell) BUT YOU WILL NEED TO PUT THE LOGIN TOKEN
request.post('/post/sell').send({type:type, kind:kind, species:species, gender:gender, price:price, description:description})
.set('x-access-token', token)
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(9); else success(9);});
// 10 FIRST CLIENT POSTS (MATE). YOU MAY TRY POSTING INTO (/post/mate) BUT YOU WILL NEED TO PUT THE LOGIN TOKEN
request.post('/post/mate').send({type:3, kind:kind, species:species, gender:gender, description:description})
.set('x-access-token', token)
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(10); else success(10);});
// 11 FIRST CLIENT POSTS (SHELTER). YOU MAY TRY POSTING INTO (/post/shelter) BUT YOU WILL NEED TO PUT THE LOGIN TOKEN
request.post('/post/shelter').send({type:2, kind:kind, species:species, gender:gender, description:description})
.set('x-access-token', token)
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(11); else success(11);});
// 12 FIRST CLIENT POSTS (LOST & FOUND). YOU MAY TRY POSTING INTO (/post/lost) BUT YOU WILL NEED TO PUT THE LOGIN TOKEN
request.post('/post/lost').send({type:4, kind:kind, species:species, gender:gender, description:description})
.set('x-access-token', token)
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(12); else success(12);});
// 13 FIRST CLIENT POSTS (LOST & FOUND). YOU MAY TRY POSTING INTO (/post/found) BUT YOU WILL NEED TO PUT THE LOGIN TOKEN
request.post('/post/found').send({type:5, kind:kind, species:species, gender:gender, description:description})
.set('x-access-token', token)
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(13); else success(13);});
// 14 FIRST CLIENT POSTS (EXCHANGE). YOU MAY TRY POSTING INTO (/post/exchange) BUT YOU WILL NEED TO PUT THE LOGIN TOKEN
request.post('/post/exchange').send({type:6, kind:kind, species:species, gender:gender, kindB:kind_B, speciesB:species_B, genderB:gender_B, description:description})
.set('x-access-token', token)
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(14); else success(14);});
// 15 FIRST CLIENT EDITS HIS POST. YOU MAY TRY POSTING INTO (/post/edit) BUT YOU WILL NEED TO PUT THE LOGIN TOKEN & THE ID IN THE BODY
request.post('/post/edit').send({id:5, type:5, kind:kind, species:species, gender:gender, kindB:kind_B, speciesB:species_B, genderB:gender_B, description:"I changed The Post"})
.set('x-access-token', token)
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(15); else success(15);});
// 16 FIRST CLIENT WANTS TO SEARCH FOR A POST
request.get('/post/search').send({})
.set('kind', kind)
.set('species', species)
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(16); else success(16);});
// 17 FIRST CLIENT WANTS TO VIEW POSTS AND INFO (MUST BE LOGGED IN), TO TRY THIS YOU HAVE TO PUT THE TOKEN IN THE QUERY
request.get('/post/viewPostsAndInfo?token='+token).send({})
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(17); else success(17);});
// 18 FIRST CLIENT WANTS TO VIEW POSTS.
request.get('/post/view').send({})
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(18); else success(18);});
// 19 FIRST CLIENT REVIEWS A POST, TO TRY THIS YOU HAVE TO ADD THE POST NUMBER TO THE HEADER AND THE TOKEN TO THE BODY
request.post('/post/review').send({token : token, vote : '1'})
.set('id', '5')
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(19); else success(19);});
// 20 FIRST CLIENT GETS A SPECIFIC POST.
request.get('/post/specificPost').send({})
.set('x-access-token', token)
.set('_id', 28)
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(20); else success(20);});
// 21 FIRST CLIENT IS GETTING INFORMATION ABOUT POST OWNER BY THE POST ID
request.get('/post/specificUser').send({})
.set('x-access-token', token)
.set('_id', 5)
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(21); else success(21);});
// 22 FIRST CLIENT REVIEWS A POST, TO TRY THIS YOU HAVE TO ADD THE POST NUMBER TO THE HEADER AND THE TOKEN TO THE BODY
request.get('/post/filter/'+'buy').send()
.set('x-access-token', token)
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(22); else success(22);});

// PROFILE
// 23 FIRST CLIENT WANTS TO VIEW THE PROFILE OF THE OTHER CLIENT
request.get('/profile/view').send({})
.set('x-access-token', token)
.set('username', u2)
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(23); else success(23);});
// 24 FIRST CLIENT WANTS TO CHANGE HIS PASSWORD
request.post('/profile/pass').send({token : token, password : p1, verify : p1, newPassword : "someNewPassword"})
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(24); else success(24);});
// 25 FIRST CLIENT WANTS TO DELETE HIS PROFILE
request.post('/profile/delete').send({token : token, password : p1, verify : p1})
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(25); else success(25);});
// 26 FIRST CLIENT WANTS TO RATE
request.post('/profile/rate').send({token : token, remail : e2, rate : '4'})
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(26); else success(26);});


// MESSAGES
// 27 FIRST CLIENT WANTS TO VIEW HIS MESSAGES
request.get('/message/view').send({token : token})
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(27); else success(27);});
// 28 FIRST CLIENT WANTS TO SEND MESSAGE TO THE SECOND CLIENT
request.post('/message/send').send({token : token, senderUsername : u1, receiverUsername : u2, messageContent : 'HI'})
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(28); else success(28);});

// LOGGING OUT
// 29 FIRST CLIENT LOGS OUT, YOU HAVE TO ADD THE TOKEN TO THE BODY
request.post('/logout').send({token : token})
.expect('Content-Type', /json/)
.expect(200)
.end(function (err, res) {if(err) error(29); else success(29);});


// A FUNCTION TO TELL YOU WHICH TEST FAILED
var error = function (requestNumber) {
  console.log("Test Number " + requestNumber + " Failed");
}

var success = function (requestNumber) {
  console.log("Test Number " + requestNumber + " Passed");
}
