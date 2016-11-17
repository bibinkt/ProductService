/**
 * Created by bthiru on 11/14/2016.
 */
var cassandra = require('cassandra-driver');
var async = require('async');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'user_service'});

exports.authenticate = function(req, res) {
    var user_id = req.param('id');
    var pwd = req.param('pwd');

    var  cquery = "select * from user where user_name='"+user_id+"' and password='"+pwd+"' allow filtering";
    console.log(cquery);
    client.execute(cquery, function (err, result) {

            if (typeof result === 'undefined') {
                return res.send('false');
            }else
            {
                var jsonService ='';
               for (var i = 0; i < result.rows.length; i++) {

                    service = result.rows[i];

                    jsonService = '{"user":{'
                        + '"user_name" : "'+ service.user_name + '", '
                        + '"user_id" : "'+ service.user_id + '"}} ';
                }
                return res.json(jsonService);
            }
        }
    )
};