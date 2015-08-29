// Author: @ecairol
angular
    .module("bateryWatcher")
    .factory("Battery", Battery);

function Battery($q) {
    return {
        get: get
    };

    function get() {
        return $q(function(resolve, reject) {
            navigator.getBattery().then(function(battery) {
                resolve(battery);
            });
        });
    }
}