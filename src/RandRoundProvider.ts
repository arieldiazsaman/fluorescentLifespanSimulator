import { rand } from "./utils/utils";

/**
 * Singleton con el único propósito de proporcionar resultados de rands iguales en cada tipos de simulaciones
 * para obtener los mismos resultados finales.
 */
export default class RandRaundProvider {
    private static instance: RandRaundProvider;
    private randPrimaryRounds: number[] = [];
    private randSecondaryRounds: number[] = [];
    private currentPrimaryRound: number = 0;
    private currentSecondaryRound: number = 0;

    private constructor(){};

    private addPrimaryRand(min: number, max: number): number {
        const newRand = rand(min, max);
        this.randPrimaryRounds.push(newRand);
        return newRand;
    };

    private addSecondaryRand(min: number, max: number): number {
        const newRand = rand(min, max);
        this.randSecondaryRounds.push(newRand);
        return newRand;
    };

    static getInstance(): RandRaundProvider {
        if (!RandRaundProvider.instance) {
            RandRaundProvider.instance = new RandRaundProvider();
        };
        return RandRaundProvider.instance;
    };

    getRand(min: number, max: number, type: 'primary' | undefined): number {
        if (type === 'primary') {
            this.setCurrentPrimaryRound(this.currentPrimaryRound + 1);
            if (this.currentPrimaryRound - 1 < this.randPrimaryRounds.length) {
                return this.randPrimaryRounds[this.currentPrimaryRound - 1];
            };
            return this.addPrimaryRand(min, max);
        } else {
            this.setCurrentSecondaryRound(this.currentSecondaryRound + 1);
            if (this.currentSecondaryRound - 1 < this.randSecondaryRounds.length) {
                return this.randSecondaryRounds[this.currentSecondaryRound - 1];
            };
            return this.addSecondaryRand(min, max)
        };
    };

    private setCurrentPrimaryRound(value:number): void {
        this.currentPrimaryRound = value;
    };

    private setCurrentSecondaryRound(value:number): void {
        this.currentSecondaryRound = value;
    };

    resetRound(): void {
        this.setCurrentPrimaryRound(0);
        this.setCurrentSecondaryRound(0);
    };

    resetRandRounds(): void {
        this.randPrimaryRounds = [];
        this.randSecondaryRounds = [];
    };
}
