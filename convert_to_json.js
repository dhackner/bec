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
    linkFormat: null
}).then(function(story) {
    var routes = [];
    var requiredImages = [];
    story['passages'].forEach ( (element) => {
        var route = {
            key: element['pid'].toString(),
            //bodyText: element['name'],
            bodyText: textBeforeImageAndLinks(element['text'])
        };
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
        bodyText: 'WHO',
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
    var imageString = "const requiredImages = {\n" + requiredImages.map( (imageName, index) => {return "  '"+imageName+"': require('"+imageName+"'),\n"} ) + "};\nexport default requiredImages;";
    fs.writeFile('GeneratedImages.js', imageString, (err) => {if (err) {console.log(err)}});
    console.log('done');

}).catch(function(err) {
    console.log(err);
});

textBeforeImageAndLinks = (fullText) => {
    var reducedText = fullText.split('<img')[0];
    reducedText = reducedText.split('<%=')[0];
    reducedText = reducedText.trim();
    return reducedText;
};
