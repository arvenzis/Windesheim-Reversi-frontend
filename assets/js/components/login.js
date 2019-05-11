SPA.login = (function() {

    function init() {
        let json = sessionStorage.getItem("player"); // Todo: misschien enkel de statische gegevens opslaan
        let player = $.parseJSON(json);

        if (player !== null) {
            return SPA.reversi.init();
        }

        $("#spa").append('<div class="grid"><form class="form login"> <header class="login__header"> <h3 class="login__title">Login</h3> </header> <div class="login__body"> <div class="form__field"> <input id="username" type="text" placeholder="Username" required> </div> <div class="form__field"> <input id="password" type="password" placeholder="Password" required> </div> </div> <footer class="login__footer"> <input type="submit" value="Login"></footer></form></div>');
        $('form').submit(function (e) {
            e.preventDefault();
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            SPA.api.validateLogin(username, password, function(result) {
                if (result) {
                    sessionStorage.setItem("player", JSON.stringify(result));
                    return SPA.reversi.init();
                }

                SPA.popup.show("Login failed", "The credentials don't appear to be in our database", AlertType.error); // Todo: sliding transition werkt niet meer?
            });
        });
    }

    return {
        init
    }
})();