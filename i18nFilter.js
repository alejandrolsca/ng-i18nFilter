(function () {
    'use strict';

    angular
        .module('ngI18Filter', [])

        .provider('ngI18FilterConfig', function () {
            var ngI18FilterConfigProvider = this;

            ngI18FilterConfigProvider.translations = {
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
                }
            };

            this.$get = [function () {
                return {
                    translations: ngI18FilterConfigProvider.translations
                };
            }];

        })

        .filter('i18n', [
            '$rootScope',
            'ngI18Filter',
            function ($rootScope, ngI18Filter) {
                return function (input, param) {
                    var currentLanguage = $rootScope.currentLanguage || 'es-MX',
                        keys = input.split('.'),
                        data = ngI18Filter.translations[currentLanguage],
                        value = undefined;
                    for (var key in keys) {
                        data = data[keys[keys]];
                    }
                    if (!!data) {
                        return (typeof param === "undefined") ? data : data.replace('@@', param);
                    } else {
                        return input;
                    }
                }
            }
        ])
})();


;
