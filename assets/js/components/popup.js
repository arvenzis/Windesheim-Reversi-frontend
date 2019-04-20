SPA.Popup = (function() {
    function show(title, message, type) {
        let el = document.createElement("div");
        el.setAttribute("id", "popup");
        el.setAttribute("class", type + " alert");
        el.innerHTML =  "<i id='popup-icon' class='fas fa-thumbs-down fa-4x'></i>" +
                        "<div class='message'>" +
                            "<h3>" + title + "</h3>" +
                            "<p>" + message + "</p>" +
                        "</div>";

        if (type === AlertTypeEnum.success) {
            $(el).append("<div class='button-container'>" +
                            "<button onclick='popupWidget.accept()'>Akkoord</button>" +
                            "<button onclick='popupWidget.decline()'>Weigeren</button>" +
                         "</div>");
        }

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