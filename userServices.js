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

            if (typeof result === 'undefined' || result.rows.length <= 0 ) {
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

exports.register = function(req, res) {
    console.log("hi");
    var cquery = "select count(*) from user";
    client.execute(cquery, function (err, result) {
        console.log("count -->"+result.rows[0].count);
        var count = result.rows[0].count;
        var user_id = req.param('id');
        var pwd = req.param('pwd');
        console.log("user_id -->"+user_id);
        console.log("pwd -->"+pwd);
        if(!err && pwd!=''&&user_id!='') {

            count = parseInt(count) + 1;

            const query = 'INSERT INTO user (user_id, user_name, password) VALUES (?, ?, ?)';
            const params = [count, user_id, pwd];
            client.execute(query, params, {prepare: true}, function (err) {
                if(!err) {
                    console.log("success -->Yes");
                    var jsonService = '{"user":{'
                        + '"user_name" : "'+ user_id + '", '
                        + '"user_id" : "'+ pwd+ '"}} ';
                    return res.json(jsonService);
                } else {
                    console.log("success -->No");
                    return res.json('{success:false}');
                }
            });
        } else {
            console.log("success -->No");
            return res.json('{success:false}');
        }
    });
};
exports.register1 = function(req, res) {

};