(function(angular) {
'use strict'    

angular.module('i18n',[])

    .provider('$i18n', function () {

        var $i18n = this;
        
        var $translations = {},
            $language;
        
        this.addTranslation = function(langKey, translation){
            if (!angular.isString(langKey)) {
                throw new Error("The langKey '" + langKey + "' is not a valid string");
            } else if (!angular.isObject(translation)) {
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
            if (angular.isString(langKey)) {
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
                addTranslation: $i18n.addTranslation,
                getTranslations: $i18n.getTranslations,
                setLang: $i18n.setLang,
                getLang: $i18n.getLang,
            }
        };
    })
    .filter('i18n', ['$i18n', function($i18n) {
        return function (input,param) {
            if (!$i18n.getLang()) throw new Error("Please define a language for the i18n filter.");
            var translations = $i18n.getTranslations(),
            language = $i18n.getLang(),
            keys = input.split('.'),
            data = translations[language],
            value = undefined;
            try {
                for(var key in keys) {
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
    }]);
    
})(angular);