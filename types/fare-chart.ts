export interface FareChart {
    perKilometerCharges: number;
    nightCharges: number;
    baseCabCharges: {
        mini: number;
        shared: number;
        sedan: number;
        suv: number;
        prime: number;
        xl: number;
        autoRickshaw: number;
    };
}
