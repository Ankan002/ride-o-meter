export interface FareChart {
    perKilometerCharges: number;
    nightCharges: number;
    baseCabCharges: {
        shared: number;
        sedan: number;
        suv: number;
        prime: number;
        xl: number;
        autoRickshaw: number;
    };
}
