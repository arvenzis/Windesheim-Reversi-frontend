/* Different name than feedback widget, because I think that name is misleading */
var popupWidget = (function() {
    var popup = $("#popup-widget");

    var draw = function(messageText, messageType) {
        popup.find(".message").text(messageText);

        if (messageType === "success") {
            popup.append("");
            popup.find('#popup-icon').addClass('fas fa-thumbs-up fa-4x');
            popup.addClass('alert__success');
        } else if (messageType === "failed") {
          popup.addClass('alert__danger')
        }
        // popup.find(".yes,.no").unbind().click(function()
        //         // {
        //         //     popup.hide();
        //         // });
        //         // popup.find(".yes").click(yesFn);
        //         // popup.find(".no").click(noFn);
        popup.show();
    };

    var accept = function() {
      console.log('Bedankt voor het accepteren');
    };

    var decline = function() {
        console.log('Snolbol');
        popup.hide();
    };

    return {
        draw,
        accept,
        decline,
    }

}) ();

