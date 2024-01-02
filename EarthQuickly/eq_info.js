var p2p_json;

var IDs = [];

var int = -1;

let url = 'https://api.p2pquake.net/v2/history?codes=551&limit=30';

fetch(url)
    .then(response => response.json())
    .then(json => {
        p2p_json = json;

        p2p_json.forEach(element => {
            IDs[IDs.length] = element["id"]
        });

        console.log(IDs);

        const ID = getParam("id", window.location.href);
        console.log(ID);

        const i = IDs.indexOf(ID);
        if (i != -1) {
            int = i;
        } else {
            alert("エラーが発生しました。\n有効な地震IDではありません。")
        }
    });

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function load(){
        var iframe = document.getElementById("map");

        while (true) {
            if(iframe.contentWindow.document.getElementById("Loading").style.visibility == "hidden"){
                iframe.contentWindow.QuakeJson = p2p_json;
                iframe.contentWindow.QuakeSelect(int);
                break;
            }
        }
}