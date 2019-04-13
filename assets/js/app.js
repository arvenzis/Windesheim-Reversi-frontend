/* Different name than feedback widget, because I think that name is misleading */
var popupWidget = (function() {
    var popup = $("#popup-widget");

    var draw = function(messageText, messageType) {
        popup.find(".message").html("<i id='popup-icon'></i>" + messageText);

        if (messageType === "success") {
            popup.find('#popup-icon').addClass('fas fa-thumbs-up fa-4x');
            popup.find('.button-container').show();

            popup.removeClass('alert__danger');
            popup.addClass('alert__success');
        } else if (messageType === "failed") {
            popup.find('#popup-icon').addClass('fas fa-thumbs-down fa-4x');
            popup.find('.button-container').hide();

            popup.removeClass('alert__success');
            popup.addClass('alert__danger')
        }

        popup.show();
    };

    var accept = function() {
        popup.hide();
    };

    var decline = function() {
        popup.hide();
    };

    return {
        draw,
        accept,
        decline,
    }

}) ();

