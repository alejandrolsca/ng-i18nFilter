(function (angular) {
    'use strict';

    angular.module('app', ['i18n'])
        .config(function ($i18nProvider) {
            $i18nProvider
                .addTranslation('en-US', { "sample": { "sample": { "sample": "hello" } } })
                .addTranslation('es-MX', { "sample": { "sample": { "sample": "hola" } } })
                .setLang('en-US');
        })
        /* configuration for run*/
        /*
        .run(function($i18n){
            $i18n
            .addTranslation('en-US',{"sample":{"sample":{"sample":"hello"}}})
            .addTranslation('es-MX',{"sample":{"sample":{"sample":"hola"}}})
            .setLang('en-US');
        })
        */
        .controller('appCtrl', function ($scope, $i18n, i18nFilter) {
            $scope.setLang = function (langKey) {
                $i18n.setLang(langKey);
                console.log(i18nFilter('sample.sample.sample')); //this is how we call the filter
            }
        });

})(angular);