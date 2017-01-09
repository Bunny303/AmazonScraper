var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

(function scrape(req, res) {

    //var url = 'https://www.amazon.co.uk/Levis-Womens-Jeans-ROASTED-INDIGO/dp/B01EYJVY70/ref=lp_10946158031_1_1?s=clothing&ie=UTF8&qid=1483728694&sr=1-1';
    var url = process.argv[2] || '';
    request(url, function (err, response, html) {
        if (!err && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var productTitle, description;
            var bulletin = [];
            var productDetails = [];
            var json = {};

            productTitle = $('#productTitle').text();
            json.productTitle = productTitle;

            $('#feature-bullets ul li span').each(function (i, element) {
                bulletin.push($(this).text());
            });
            json.bulletin = bulletin;

            $('#detail_bullets_id table tbody tr td div ul li').each(function (i, element) {
                productDetails.push($(this).text());
            });
            json.productDetails = productDetails;

            console.log(json);
        }
    })
})();


app.listen('8000');
console.log('Magic happens on port 8000');
module.exports = app;