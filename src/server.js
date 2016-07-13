var express = require( "express" );
var bodyParser = require( "body-parser" );
var User = require( "./mongoosedb" ).User;
var app = express();

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.post( "/users", function( request, response )
{
    User.findOne( { "username": request.body.username }, function( error, user )
    {
        if( error )
            console.log( error );

        if( user.password === request.body.password )
            response.json( user );
        else
            response.send( "Error" );
    } );
} );

var port = process.env.PORT || 8000;

console.log( "Running in port " + port );

app.listen( port );
