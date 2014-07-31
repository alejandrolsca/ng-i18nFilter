(function () {
    'use strict';

    angular
        .module('demoApp', [
            'ngI18Filter'
        ])

        .config(function (ngI18FilterProvider) {
            ngI18FilterProvider.translations = {
                "es-MX": {
                    "sample": {
                        "sample": {
                            "sample": "hola mundo"
                        },
                        "sample2": [1, 2, 3]
                    }
                },
                "en-US": {
                    "sample": {
                        "sample": {
                            "sample": "hello world"
                        },
                        "sample2": [1, 2, 3]
                    }
                },
                "pl-PL": {
                    "sample": {
                        "sample": {
                            "sample": "witaj świecie"
                        },
                        "sample2": [1, 2, 3]
                    }
                }
            }
        })

        .controller('AppCtrl', function ($scope, $rootScope, i18nFilter) {
            $scope.changeLang = function (lang) {
                $rootScope.currentLanguage = lang; //for ex. 'en-US'
            };
            $scope.hello = i18nFilter("sample.sample.sample");
        })
})();