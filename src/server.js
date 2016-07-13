var express = require( "express" );
var bodyParser = require( "body-parser" );
var User = require( "./mongoosedb" ).User;
var app = express();

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

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

        response.send( "Save" );
    } );
} );

var port = process.env.PORT || 8000;

console.log( "Running in port " + port );

app.listen( port );
