//Drop box information

//Authentication
// var node_dropbox = require('node-dropbox');
//not sure what to redirect to as of right now
// node_dropbox.Authenticate(process.env.DROP_ID, process.env.DROP_SECRET, 'redirect_url', function(err, url){
	// redirect user to the url.
	// looks like this: "https://www.dropbox.com/1/oauth2/authorize?client_id=3zo2ls95vz9v6a9&response_type=code&redirect_uri=<redirect_url_here>"
// });

// node_dropbox.AccessToken(process.env.DROP_ID, process.env.DROP_SECRET, 'access_code', 'redirect_url', function(err, body) {
// 	access_token = body.access_token;
// });

//Make API Calls
// api = node_dropbox.api(access_token);
// api.account(function(err, res, body) {
// 	console.log(body);
// });