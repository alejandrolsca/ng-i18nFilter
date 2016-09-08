(function (angular) {
    'use strict'

    angular.module('i18n', [])

        .provider('$i18n', [function () {

            var $i18n = this;

            var $translations = {},
                $language;

            var locale = /[a-z]{2}-[A-Z]{2}/;

            this.addTranslation = function (langKey, translation) {
                if (!(typeof langKey === 'string') && (locale.test(langKey))) {
                    throw new Error("The locale '" + langKey + "' is not a valid");
                } else if (!angular.isObject(translation)) {
                    throw new Error("The translation '" + translation + "' is not a valid object");
                } else {
                    $translations[langKey] = translation;
                    return this;
                }
            };

            this.getTranslations = function () {
                return $translations;
            };

            this.setLang = function (langKey) {
                if (!(typeof langKey === 'string') && (locale.test(langKey)))
                    throw new Error("The langKey '" + langKey + "' is not a valid");
                $language = langKey;
                return this;
            };

            this.getLang = function () {
                return $language;
            };

            this.$get = ['$injector', function ($injector) {
                return {
                    addTranslation: $i18n.addTranslation,
                    getTranslations: $i18n.getTranslations,
                    setLang:$i18n.setLang,
                    getLang: $i18n.getLang
                }
            }];
        }])
        .filter('i18n', ['$i18n', function ($i18n) {
            function i18nFilter(input, param) {
                console.log($i18n.getLang());
                if (!$i18n.getLang()) throw new Error("Please define a language for the i18n filter.");
                var translations = $i18n.getTranslations(),
                    language = $i18n.getLang(),
                    keys = input.split('.'),
                    data = translations[language],
                    value = undefined;
                try {
                    for (var key in keys) {
                        data = data[keys[key]];
                    }
                    if (!!data) {
                        return (typeof param === "undefined") ? data : data.replace('@@', param);
                    } else {
                        return input;
                    }
                } catch (e) {
                    console.log(e.description);
                    return input;
                }
            }
            i18nFilter.$stateful = true;
            return i18nFilter;
        }]);

})(angular);