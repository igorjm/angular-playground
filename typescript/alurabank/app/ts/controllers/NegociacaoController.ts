import  {NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';
import { logarTempoDeExecucao, domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService } from '../services/index'
import { imprimir } from '../helpers/index';

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    private _negociacaoService = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    @logarTempoDeExecucao()
    adiciona(event: Event) {
        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if(!this._isUtilDay(data)) {
            this._mensagemView.update('Data inválida! Somente negociações em dias úteis');
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);

        imprimir(negociacao, this._negociacoes);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso');
    }

    private _isUtilDay(data: Date) {
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

    @throttle()
    async importaDados() {
        try {
            const negociacoesParaImportar = await this._negociacaoService
                .obterNegociacoes(res => {
                    if (res.ok) {
                        return res;
                    } else {
                        throw new Error(res.statusText);
                    }
            })

            const negociacoesJaImportadas = this._negociacoes.toArray();

            negociacoesParaImportar
                .filter(negociacao => 
                        !negociacoesJaImportadas.some(jaImportada => 
                                negociacao.isEqual(jaImportada)))
                .forEach(negociacao => 
                    this._negociacoes.adiciona(negociacao))

                this._negociacoesView.update(this._negociacoes);
        } catch (err) {
            this._mensagemView.update(err.message);
        }
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}