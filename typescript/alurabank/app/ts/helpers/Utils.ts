import { Imprimivel } from '../models/index';

export function imprimir(...objetos: Imprimivel[]) {
    objetos.forEach(objeto => objeto.toText());
}