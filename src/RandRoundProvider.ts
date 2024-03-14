import { rand } from "./utils/utils";

/**
 * Singleton con el único propósito de proporcionar resultados de rands iguales en cada tipos de simulaciones
 * para obtener los mismos resultados finales.
 */
export default class RandRaundProvider {
    private static instance: RandRaundProvider;
    private randRounds: number[] = [];
    private currentRound: number = 0;

    private constructor(){};

    private addRand(min: number, max: number): number {
        const newRand = rand(min, max);
        this.randRounds.push(newRand);
        return newRand;
    };

    static getInstance(): RandRaundProvider {
        if (!RandRaundProvider.instance) {
            RandRaundProvider.instance = new RandRaundProvider();
        };
        return RandRaundProvider.instance;
    };

    getRand(min: number, max: number): number {
        this.setCurrentRound(this.currentRound + 1);
        if (this.currentRound - 1 < this.randRounds.length) {
            return this.randRounds[this.currentRound - 1];
        };
        return this.addRand(min, max);
    };

    private setCurrentRound(value:number): void {
        this.currentRound = value;
    };

    resetRound(): void {
        this.setCurrentRound(0);
    };

    resetRandRounds(): void {
        this.randRounds = [];
    };
}
