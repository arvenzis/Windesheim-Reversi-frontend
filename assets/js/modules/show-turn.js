SPA.showTurn = (function() {
    function getTemplate(color) {
        if ($("#has-turn").length) {
            $("#has-turn").empty().append(parseTemplate(color));
        } else {
            let el = document.createElement("div");
            el.setAttribute("id", "has-turn");
            el.innerHTML = parseTemplate(color);
            document.body.appendChild(el);
        }
    }

    function parseTemplate(color) {
        let template = document.getElementById("show-turn").innerHTML;
        let compiledTemplate = Handlebars.compile(template);
        return compiledTemplate({ color: color });
    }

    return {
        getTemplate
    }
})();