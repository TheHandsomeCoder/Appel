var app = angular.module('app', ['breeze.angular']);

angular.module('app').controller('breezeTest', ['$scope', 'breeze', breezeCtrl]);

function breezeCtrl($scope, breeze) {

    breeze.NamingConvention.camelCase.setAsDefault();

    var ds = new breeze.DataService({
        serviceName: 'http://localhost:9000',
        hasServerMetadata: false
    });

    var manager = new breeze.EntityManager({dataService: ds});

    var query = new breeze.EntityQuery()
        .from("fencers");

    manager.executeQuery(query)
        .then(function (data) {
            console.log(data);
        })
        .catch(function (e) {
            console.error(e);
        });

}