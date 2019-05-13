SPA.sessionStorage = (function() {
    function setPlayer(player) {
        sessionStorage.setItem("player", JSON.stringify(player));
    }

    function getPlayer() {
        return $.parseJSON(sessionStorage.getItem("player")); // Todo: misschien enkel de statische gegevens opslaan
    }

    return {
        setPlayer,
        getPlayer
    }
})();