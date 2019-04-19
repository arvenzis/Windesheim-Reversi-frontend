SPA.Popup = (function() {
    function show(title, message, type) {
        let el = document.createElement("div");
        el.setAttribute("id", "popup");
        el.setAttribute("class", type);
        el.innerHTML = "<h3>" + title + "</h3>" + "<p>" + message + "</p>";
        document.getElementById("spa").appendChild(el);
    }

    function accept() {

    }

    function decline() {

    }

    return {
        show,
        accept,
        decline,
    }

}) ();