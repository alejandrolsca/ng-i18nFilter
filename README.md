##ng-i18nFilter
==========

####ng-i18n Filter

The ng-i18nFilter is a simple filter that helps to translate almost anything but
what are the benefits?

  * Easy to implement
  * Returns any kind of values (strings, objects, arrays..)
  * Can be mixed with other filters
  * depth unlimited (this means your that your **JSON** structure for translations **can be as big as you want**)

```
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
````
I strongly recommend to use something like watchify to have the
translations in separate way

```
var translations: {
  "es-MX" : require('./languages/es-MX'),
  "en-US" : require('./languages/en-US')
}
```
**How to use it in a view:**
```
  <span>{{ 'sample.sample.sample' | i18n }}</span> 
````
_if the filter doesnt find the searched key, it will return the key_

**With parameters**
```
  <span>{{ 'sample.sample.sample' | i18n:param }}</span>
```
**Mixing with another filter**
```
  <span>{{ 'sample.sample.sample' | i18n:param | uppercase}}</span>
```
**Change language on the go**
```
.controller('Ctrl',function($scope, $rootScope){
  $scope.changeLang = function(lang)  {
    $rootScope.currentLanguage = lang; //for ex. 'en-US'
  }
});

<span ng-click="changeLang('es-MX')">Español</span>
<span ng-click="changeLang('en-US')">English</span>
```
**Use the filter inside a controller**
_Remember that you need to add the word 'Filter' to the name of the filter_
```
.controller('AppCtrl',function($scope, i18nFilter){
  $scope.hello = i18nFilter("sample.sample.sample");
});
```
this was based on the @brunoscopelliti tutorial
http://blog.brunoscopelliti.com/internazionalization-i18n-with-angularjs with some small adaptations
