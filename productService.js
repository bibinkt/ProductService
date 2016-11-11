/**
 * Created by bthiru on 11/6/2016.
 */

var cassandra = require('cassandra-driver');
var async = require('async');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'product_service'});

exports.findAll = function(req, res) {
    res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);
};

exports.findById = function(req, res) {

   var  cquery = "select * from pp where pp_id='"+req.params.id+"'";
    console.log(cquery);
    client.execute(cquery, function (err, result) {

        if (typeof result === 'undefined')
            return res.send('No service found.');
        else
        {
            AlljsonServices='';

            for (var i = 0; i < result.rows.length; i++) {

                service = result.rows[i];

                jsonService = '{'
                    + '"pp_id" : "'+ service.pp_id + '", '
                    + '"pp_name" : "'+ service.pp_name + '", '
                    + '"pp_image_url" : "'+ service.pp_image_url + '", '
                    + '"pp_long_description" : "'+ service.pp_long_description + '"}';
                AlljsonServices = AlljsonServices+jsonService;
            }
            AlljsonServices=AlljsonServices +'';
            res.send(AlljsonServices);

        }
    }
    )
};