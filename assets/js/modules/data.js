SPA.data = (function() {
    const uri = "https://localhost:5003/";
    let configMap;

    function init(env = "development") {
        configMap = {
            environment: env
        }
    }

    function doCall(endpoints, type, data = null) {
        if (configMap.environment === "production") {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: uri + endpoints,
                    type: type,
                    contentType: "application/json",
                    data: data,
                    success: function (result) {
                        resolve(result);
                    },
                    error: function (request) {
                        reject(request); // undefined?
                    }
                });
            });
        }
    }

    return {
        init,
        doCall
    }
})();
