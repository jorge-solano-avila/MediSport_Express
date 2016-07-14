var express = require( "express" );
var bodyParser = require( "body-parser" );
var User = require( "./mongoosedb" ).User;
var Center = require( "./mongoosedb" ).Center;
var app = express();

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

var rad = function( x )
{
	return x * Math.PI / 180;
}

var getDistance = function( p1, p2 )
{
	var R = 6378137;
	var dLat = rad( p2[0] - p1[0] );
	var dLong = rad( p2[1] - p1[1] );
	var a = Math.sin( dLat / 2 ) * Math.sin( dLat / 2 ) +
        Math.cos( rad( p1[0] ) ) * Math.cos( rad( p2[0] ) ) *
        Math.sin( dLong / 2 ) * Math.sin( dLong / 2 );
    var c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1 - a ) );
    var d = R * c;
    return d;
}

app.post( "/user", function( request, response )
{
    User.findOne( { "username": request.body.username }, function( error, user )
    {
        if( error )
            response.send( error );

        if( user === null )
            response.send( "Username incorrect" );
        else if( user.password === request.body.password )
            response.json( user );
        else
            response.send( "Password incorrect" );
    } );
} );

app.post( "/newUser", function( request, response )
{
    var user = new User
    ( {
        name: request.body.name,
        username: request.body.username,
        password: request.body.password
    } );

    user.save( function( error )
    {
        if( error )
            response.send( error );
		else
		{
			User.findOne( { "username": request.body.username }, function( error, user )
		    {
		        response.json( user );
		    } );
		}
    } );
} );

app.get( "/centers", function( request, response )
{
    Center.find( function( error, centers )
    {
        if( error )
            response.send( error );
        else
            response.json( centers );
    } );
} );

app.post( "/centers", function( request, response )
{
    Center.find( function( error, centers )
    {
        if( error )
            response.send( error );
        else
        {
            var nearbyCenters = [];
            for( var i in centers )
            {
                var position = [request.body.latitude, request.body.longitude];
                var center = [centers[i].latitude, centers[i].longitude];
                var distance = getDistance( position, center );
                if( distance < request.body.value )
                    nearbyCenters.push( centers[i] )
            }
            response.json( nearbyCenters );
        }
    } );
} );

var port = process.env.PORT || 8000;

console.log( "Running in port " + port );

app.listen( port );
