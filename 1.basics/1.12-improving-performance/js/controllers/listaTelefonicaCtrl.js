angular.module("listaTelefonica").controller("listaTelefonicaController", function ($scope, contatos, operadoras, serialGenerator, $filter) {
    $scope.app = $filter('upper')("Lista Telefonica");
    $scope.contatos = contatos.data;
    $scope.operadoras = operadoras.data;

    var init = function () {
        calcularImpostos($scope.contatos);
        generateSerial($scope.contatos);
    }

    var calcularImpostos = function(contatos) {
        contatos.forEach(function (contato) {
            contato.operadora.precoComImposto = calcularImposto(contato.operadora.preco);
        });
    };

    var generateSerial = function (contatos) {
        contatos.forEach(function(item) {
            item.serial = serialGenerator.generate();
        })
    };

    $scope.adicionarContato = function (contato) {
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        contatosAPI.saveContato(contato).success(function(data) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        });
    };

    $scope.apagarContato = function (contatos) {
        $scope.contatos = contatos.filter(function (contato) {
            if(!contato.selecionado) return contato;
        });
        $scope.verificarContatoSelecionado($scope.contatos);
    };
    $scope.verificarContatoSelecionado = function (contatos) {
        $scope.hasContatoSelecionado = contatos.some(function (contato) {
            return contato.selecionado;
        });
    };
    $scope.ordernarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };
    
    var calcularImposto = function (preço) {
        var imposto = 1.2;
        return preço * imposto;
    }

    init();

});