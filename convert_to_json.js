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
    story['passages'].forEach ( (element) => {
        var route = {
            key: element['pid'],
            bodyText: element['name'],
        };
        if (element['links'] != undefined) {
            element['links'].forEach ( (link) => {
                route[link['label'].trim().toLowerCase()] = link['passageId'];
            });
        }

        routes.push(route);
    });

    console.log(routes);

    // TODO write this to json - this should eventually be part of the
    // build process

}).catch(function(err) {
    // ... 
});

