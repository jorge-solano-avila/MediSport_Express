var mongoose = require( "mongoose" );
var Schema = mongoose.Schema;

mongoose.connect( "mongodb://jorge52an:jasa955025@ds017205.mlab.com:17205/medisport", function( error )
{
    if( error )
        console.log( error );
    else
        console.log( "connection" );
} );

var center = new Schema
( {
    name: String,
    address: String,
    location: String,
    telephones: Array,
    photo: String,
    latitude: Number,
    longitude: Number
}, { versionKey: false } );

var user = new Schema
( {
    name:
    {
        type: String,
        required: "El nombre es necesario",
    },
    username:
    {
        type: String,
        required: "El usuario es necesario",
    },
    password:
    {
        type: String,
        required: "La contraseña es necesaria",
        minlegth: [5, "La contraseña es muy corta"]
    },
    birthday: Date,
    age: Number,
    photo: String
}, { versionKey: false } );

var User = mongoose.model( "User", user );
var Center = mongoose.model( "Center", center );

module.exports.User = User;
module.exports.Center = Center;
