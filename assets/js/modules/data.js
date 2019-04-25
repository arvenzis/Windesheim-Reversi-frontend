SPA.data = (function() {
    var configMap;
    const uri = "https://localhost:5003/";

    function init(env, endpoints){
        configMap = {
            environment: env,
            endpoints: endpoints,
        }
    }

    function getGames() {
        if (configMap.environment === "production") {
            $.ajax({
                url: uri + configMap.endpoints,
                success: function(game) {
                    document.getElementById("spa").innerHTML = game.id;
                },
                error: function() {
                    throw new Error("kapot henk");
                }
            });
        }
    }

    return {
        init,
        getGames,
    }
})();
