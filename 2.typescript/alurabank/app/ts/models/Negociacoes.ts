import { Negociacao } from './index';
import { MeuObjeto } from './MeuObjeto'

export class Negociacoes implements MeuObjeto<Negociacoes> {

    private _negociacoes: Array<Negociacao> = []; // ou
    // private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }

    toArray(): Negociacao[] {
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    toText(): void {
        console.log(JSON.stringify(this._negociacoes));
    }

    isEqual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.toArray());
    }
}