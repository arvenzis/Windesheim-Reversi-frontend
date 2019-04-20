SPA.data = (function() {
    var configMap;
    const base_url = "http://api.openweathermap.org/data/2.5/weather?q=####&APPID=????";
    const api = "38c54cfa93fde5b1a7a55e4c7f6943e0";

    function init(env, endpoints){
        configMap = {
            environment: env,
            endpoints: endpoints,
        }
    }

    function getGames() {
        if (configMap.environment === "production") {
            $.ajax({
                url: base_url + configMap.endpoints,
                success: function() {
                    console.log('jep');
                },
                error: function() {
                    console.log('nein');
                }
            });
        }
    }

    return {
        init,
        getGames,
    }
})();
