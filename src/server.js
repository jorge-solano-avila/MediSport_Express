var express = require( "express" );
var app = express();
var User = require( "./mongoosedb" ).User;

app.get( "/", function( request, response )
{
    response.send( "Hello world" );
    User.find( function( error, users )
    {
        if( error )
            console.log( error );

        response.json( users );
    } );
} );

var port = process.env.PORT || 8000;

console.log( "Running in port " + port );

app.listen( port );
