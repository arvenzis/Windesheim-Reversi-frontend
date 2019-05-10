SPA.login = (function() {

    function init() {
        $("#spa").append('<div class="grid"><form class="form login"> <header class="login__header"> <h3 class="login__title">Login</h3> </header> <div class="login__body"> <div class="form__field"> <input id="username" type="text" placeholder="Username" required> </div> <div class="form__field"> <input id="password" type="password" placeholder="Password" required> </div> </div> <footer class="login__footer"> <input type="submit" value="Login"></footer></form></div>');
        $('form').submit(function (e) {
            e.preventDefault();
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            SPA.api.validateLogin(username, password, function(result) {
                if (result) {
                    SPA.gameBoard.searchGame();
                }
            });

            // let loginData = JSON.stringify({"username" : username, "password" : password});
            // SPA.data.doCall("https://localhost:5003/api/auth", "POST", loginData).then(function() {
            //     console.log("Hier! Ie dut t weh");
            //     return true;
            // }).catch(function() {
            //     console.log("Kannieinloggenie");
            //     return false;
            // });

            SPA.popup.show("Mislukt", "De gegevens komen helaas niet voor in onze database", AlertType.error); // Todo: sliding transition werkt niet meer?
        });
    }

    return {
        init
    }
})();