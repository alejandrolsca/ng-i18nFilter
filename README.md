##ng-i18nFilter
==========

####ng-i18n Filter

The ng-i18nFilter is a simple filter that helps to translate almost anything but
what are the benefits?

  * Easy to implement
  * Returns any kind of values (strings, objects, arrays..)
  * Can be mixed with other filters
  * depth unlimited (this means your that your **JSON** structure for translations **can be as big as you want**)

You can setup the module in the .config phase (_notice that we need to add an extra "Provider" word to the provider name for this_)
```
angular.module('app',['i18n'])
    .config(function($i18nProvider){
        $i18nProvider
        .addTranslation('en-US',{"sample":{"sample":{"sample":"hello"}}})
        .addTranslation('es-MX',{"sample":{"sample":{"sample":"hola"}}})
        .setLang('en-US');
    })
```
Also in the .run phase
```
angular.module('app',['i18n'])
    .run(function($i18n){
        $i18n
        .addTranslation('en-US',{"sample":{"sample":{"sample":"hello"}}})
        .addTranslation('es-MX',{"sample":{"sample":{"sample":"hola"}}})
        .setLang('en-US');
    })
```

I strongly recommend to use something like watchify to have the
translations in separate way

```
angular.module('app',['i18n'])
    .run(function($i18n){
        $i18n
        .addTranslation('en-US',require('./languages/en-US'))
        .addTranslation('es-MX',require('./languages/es-MX'))
        .setLang('en-US');
    })
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
.controller('appCtrl',function($scope, $i18n,i18nFilter){
        $scope.setLang = function(langKey){
            $i18n.setLang(langKey);
            console.log(i18nFilter('sample.sample.sample')); //this is how we call the filter
        }
    });

<button ng-click="setLang('es-MX')">Español</button>
<button ng-click="setLang('en-US')">English</button>
```
**Use the filter inside a controller**
_Remember that you need to add the word 'Filter' to the name of the filter_
```
.controller('appCtrl',function($scope, i18nFilter){
  $scope.hello = i18nFilter("sample.sample.sample");
});
```