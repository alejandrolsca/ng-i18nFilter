var app = angular.module('app',[])

.filter('i18n', ['$rootScope', function($rootScope) {
    return function (input,param) {
        var translations = {
            "es-MX" : {
              "sample":{
                "sample":{
                  "sample":"hola mundo"
                },
                "sample2":[1,2,3]
              }
            },
            "en-US" : {
              "sample":{
                "sample":{
                  "sample":"hello world"
                },
                "sample2":[1,2,3]
              }
            }
        };
        var currentLanguage = $rootScope.currentLanguage || 'es-MX',
        keys = input.split('.'),
        data = translations[currentLanguage],
        value = undefined;
        for(var key in keys) {
            data = data[keys[keys]];
        }
        if (!!data) {
            return (typeof param === "undefined") ? data : data.replace('@@', param);
        } else {
            return input;
        }
    }
}])

.controller('AppCtrl',function($scope, $rootScope, i18nFilter){
  $scope.changeLang = function(lang)  {
    $rootScope.currentLanguage = lang; //for ex. 'en-US'
  }
  $scope.hello = i18nFilter("sample.sample.sample");
});
