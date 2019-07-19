import {Negociacao} from './Negociacao';

export class Negociacoes {

    private _negociacoes: Array<Negociacao> = []; // ou
    // private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }

    toArray(): Negociacao[] {
        return ([] as Negociacao[]).concat(this._negociacoes);
    }
}