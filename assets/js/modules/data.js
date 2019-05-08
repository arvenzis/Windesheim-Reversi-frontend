SPA.data = (function() {
    function doCall(url, type, data = null) {
        console.log("do call");
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                type: type,
                contentType: "application/json",
                data: data,
                success: function (result) {
                    console.log(result);
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
