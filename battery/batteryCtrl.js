// Author: @ecairol
angular
    .module("bateryWatcher")
    .controller("DashboardCtrl", DashboardCtrl);

function DashboardCtrl($scope, Battery) {
    var vm = $scope;
    var batteryData = {};

    vm.battery = {
        chargingText: "Loading"
    };

    init();

    function init() {
        Battery.get().then(function(data) {
            batteryData = data;

            render();
            setEvents();

        }, function(reason) {
            alert('Failed: ' + reason);
        });
    }

    function render() {
        vm.battery.charging = batteryData.charging;
        vm.battery.chargingText = (batteryData.charging) ? "Charging" : "Not charging";
    }

    function setEvents() {
        batteryData.addEventListener('chargingchange', function() {
            vm.$broadcast('chargingchange');
            $scope.$apply(function() {
                batteryData = batteryData;
            })
        });

        vm.$on('chargingchange', function() {
            render();
        });

    }

}