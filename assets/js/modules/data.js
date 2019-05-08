SPA.data = (function() {
    function doCall(url, type, data = null) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                type: type,
                contentType: "application/json",
                data: data,
                success: function (result) {
                    resolve(result);
                },
                error: function (errorMessage) {
                    reject(errorMessage);
                }
            });
        });
    }

    return {
        doCall,
    }
})();
