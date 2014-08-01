(function(angular) {
'use strict'    

angular.module('i18n',[])

    .provider('$i18nProvider', function () {

        var $i18nProvider = this;
        
        var $translations = {},
            $language;
        
        this.addTranslation = function(langKey, translation){
            if (!langKey) {
                throw new Error("The langKey '" + langKey + "' is not a valid string");
            } else if (!translation) {
                throw new Error("The translation '" + translation + "' is not a valid object");
            } else {
                $translations[langKey] = translation;
                return this;
            }
        };
        
        this.getTranslations = function(){
            return $translations;
        };

        this.setLang = function(langKey) {
            if (langKey) {
                $language = langKey;
                return this;
            }
            return $language;
        };

        this.getLang = function () {
            return $language
        };
        
        this.$get = function ($injector) {
            return {
                addTranslation: $i18nProvider.addTranslation,
                getTranslations: $i18nProvider.getTranslations,
                setLang: $i18nProvider.setLang,
                getLang: $i18nProvider.getLang,
            }
        };
    })
    .filter('i18n', ['$i18nProvider', function($i18nProvider) {
        return function (input,param) {
            if (!$i18nProvider.getLang()) throw new Error("Please define a language for the i18n filter.");
            var translations = $i18nProvider.getTranslations(),
            language = $i18nProvider.getLang(),
            keys = input.split('.'),
            data = translations[language],
            value = undefined;
            for(var key in keys) {
                data = data[keys[key]];
            }
            if (!!data) {
                return (typeof param === "undefined") ? data : data.replace('@@', param);
            } else {
                return input;
            }
        }
    }]);
    
})(angular);