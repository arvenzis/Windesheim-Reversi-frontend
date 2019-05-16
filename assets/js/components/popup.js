SPA.popup = (function() {
    function show(title, message, type) {
        let container = document.createElement(("div"));
        container.setAttribute("id", "slide-up");

        let el = document.createElement("div");
        el.setAttribute("id", "popup");
        el.setAttribute("class", type + " alert fade-in");
        el.innerHTML =  "<i id='popup-icon' class='fas fa-thumbs-up fa-4x'></i>" +
                        "<div class='message'>" +
                            "<h3>" + title + "</h3>" +
                            "<p>" + message + "</p>" +
                        "</div>";

        if (type === AlertType.success) {
            $(el).append("<div class='button-container'>" +
                            "<button onclick='SPA.popup.accept()' class='accept'>Accept</button>" +
                            "<button onclick='SPA.popup.decline()'>Decline</button>" +
                         "</div>");
        }

        $(container).insertBefore("#spa");
        document.getElementById("slide-up").appendChild(el);

        let slideDownPopup = function() {
            document.getElementById("slide-up").setAttribute("id", "slide-down");
        };

        setTimeout(slideDownPopup, 300);
    }

    function accept() {
        document.getElementById("slide-down").setAttribute("id", "slide-up");
    }

    function decline() {
        document.getElementById("slide-down").setAttribute("id", "slide-up");
    }

    return {
        show,
        accept,
        decline,
    }

}) ();