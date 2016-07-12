var express = require( "express" );
var mongoose = require( "mongoose" );
var app = express();

mongoose.connect( "mongodb://localhost/medisport" );

app.listen( 8080 );
