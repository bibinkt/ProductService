/**
 * Created by bthiru on 11/11/2016.
 */

var cassandra = require('cassandra-driver');
var async = require('async');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'product_service'});

exports.findAll = function(req, res) {
    res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);
};

exports.findById = function(req, res) {

    var  cquery = "select * from pp_price where pp_id='"+req.params.id+"' allow filtering";
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
                        + '"list_price" : "'+ service.list_price + '", '
                        + '"sale_price" : "'+ service.sale_price + '", '
                        + '"market_label" : "'+ service.market_label + '"} ';
                    AlljsonServices = AlljsonServices+jsonService;
                }
                AlljsonServices=AlljsonServices +'';
                res.send(AlljsonServices);

            }
        }
    )
};