var express = require( "express" );
var app = express();
var User = require( "./mongoosedb" ).User;

app.get( "/users", function( request, response )
{
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
