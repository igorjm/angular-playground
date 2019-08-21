angular.module("listaTelefonica").directive("uiAlert", function() {
    return {
        templateUrl: "view/alert.html",
        replace: true,
        // A - Diretiva restrita ao atributo do elemento
        // E - Diretiva restrita ao elemento
        // C - Diretiva restrita a classe do elemento
        // M - Diretiva restrita ao comentário do elemento
        restrict: "A",
        scope: {
            title: "@",
        },
        transclude: true
    };
});