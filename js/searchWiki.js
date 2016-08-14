function searchWiki() {

    var searchTerms = $("#search-bar").val();
    $("#search-bar").blur(); //remove focus from search text bar - makes android close keyboard
    if (searchTerms) {
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?origin=*",
            data: {
                "action": "opensearch",
                "search": searchTerms,
                "format": "json"
            },
            type: "POST",
            headers: {
                "Api-User-Agent": "WikipediaViewerZelite/1.0"
            },
            success: populatePage,
            error: function(data) {
                console.log(data);
            }
        });
    }

}

function clickDivFollowLink(url) {
    return function() {
        window.location.href = url;
    };
}


function populatePage(data) {
    //first clear any previous results
    $("#search-results").empty();
    if (data[1].length === 0) {
        $("#search-results").append(
            $("<div/>", {
                class: "noresult"
            })
            .html("No results found for <strong>" + data[0] + "</strong>. Try searching for something else."));
    } else {
        for (var i = 0; i < data[1].length; i++) {
            //Build the components of each new div
            var title = $("<h2/>", {
                text: data[1][i]
            });
            var summary = $("<p/>", {
                text: data[2][i]
            });
            var url = data[3][i];

            //Populate with new results
            $("#search-results").append(
                $("<div/>", {
                    class: "result animated bounceInLeft"
                })
                .append(title, summary)
                .on("click", clickDivFollowLink(url))
            );
        }
    }
}

$(document).ready(
    $("#search-box").submit(function(event) {
        event.preventDefault();
        searchWiki();
    })
);
