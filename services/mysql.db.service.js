var mysql = require('mysql');
//var async = require('async');
var state = {
    pool: null
}

exports.connect = function(done) {
    state.pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'robocafe',
        connectionLimit: 10
    })

    done()
}

exports.get = function() {
    return state.pool;
}


