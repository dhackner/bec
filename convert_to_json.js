// TODO running this should eventually be part of the build process
var twineToJSON = require("twine_to_json");
twineToJSON({
    in: "/Users/drh/Developer/bec/BEC_twine.html",
    //out: "BEC_twine.json",
    ignoreComments: true,
    renderMarkdown: false,
    writeToFile: false,
    prettyPrint: true,
    ignorePassages: [],
    transformPassages: [],
    customTags: [],
    linkFormat: (link) => {return '';}, // Strip out links from passage body text
}).then(function(story) {
    var routes = [];
    var requiredImages = [];
    story['passages'].forEach ( (element) => {
        var route = {
            key: element['pid'].toString(),
        };
        var imgtag_rx = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
        var matches = [];
        route.bodyText = element['text']
        .replace(imgtag_rx, function(m, p1){ matches.push(p1); return ''; })
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .trim();
        if (matches.length > 0) {
            route.image = [];
            matches.forEach( (element) => { route.image.push(element); requiredImages.push(element);});
        }

        if (element['links'] != undefined) {
            if (element['links'].length <= 2) {
                element['links'].forEach ( (link) => {
                    // Standardize all links to yes/no/next
                    var label = link['label'].trim().toLowerCase();
                    if (label != 'yes' && label != 'no') {
                        label = 'next';
                    }
                    route[label] = link['passageId'].toString();
                });
            } else {
                throw 'Invalid number of links'
            }
        }
        // TODO | Add image array, add image to requiredImages list

        routes.push(route);
    });

    routes.push({
        key: 'homepage',
        next: '1',
        bodyText: '',
        image: [
            './img/who_crest.png',
        ],
    });
    requiredImages.push('./img/who_crest.png');



    //console.log(routes);
    fs = require('fs');
    fs.writeFile('GeneratedRoutes.json', JSON.stringify(routes, null, 2), (err) => {if (err) {console.log(err)}});

    // React cannot dynamically load static assets, so they all need to
    // be required beforehand
    var imageString = "const requiredImages = {\n" + requiredImages.map( (imageName, index) => {return "  '"+imageName+"': require('"+imageName+"')\n"} ) + "};\nexport default requiredImages;";
    fs.writeFile('GeneratedImages.js', imageString, (err) => {if (err) {console.log(err)}});
    console.log('done');

}).catch(function(err) {
    console.log(err);
});
