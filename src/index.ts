import TubesYearlyMaintSimByValidation from './TubesYearlyMaintSimByValidation';
import { FluorescentYearlyMaintSimulatorInterface } from './Interfaces/FluorescentYearlyMaintSimulator';
import TubesYearlyMaintSimByDecrement from './TubesYearlyMaintSimByDecrement';
import RandRaundProvider from './RandRoundProvider';

require('dotenv').config();

const getEnvNumberValue = (value: string | undefined): number | null => {
    return isNaN(Number(value)) ? null : Number(value)
};

const defineConstructorData = (): FluorescentYearlyMaintSimulatorInterface => ({
    classroomUnits: getEnvNumberValue(process.env.CLASSROOM_UNITS),
    tubesPerUnit: getEnvNumberValue(process.env.TUBES_PER_UNIT),
    classroomDailyUsage: getEnvNumberValue(process.env.CLASSROOM_DAILY_USAGE),
    classroomWeeklyUsage: getEnvNumberValue(process.env.CLASSROOM_WEEKLY_USAGE),
    classroomMonthlyUsage: getEnvNumberValue(process.env.CLASSROOM_MONTHLY_USAGE),
    tubeWorkTimeMin: getEnvNumberValue(process.env.TUBE_WORKING_TIME_MIN),
    tubeWorkTimeMax: getEnvNumberValue(process.env.TUBE_WORKING_TIME_MAX),
    tubeFailTolerancePerUnit: getEnvNumberValue(process.env.TUBE_FAIL_TOLERANCE_PER_UNIT),
    fluorescentTubeCost: getEnvNumberValue(process.env.FLUORESCENT_TUBE_COST),
});

const main = () => {
    const randRaundProvider = RandRaundProvider.getInstance();
    const data = defineConstructorData();
    /**
     * Simulation By Validation
     */
    const simulatorByValidation = new TubesYearlyMaintSimByValidation(data);
    const simulationByValidationResults = simulatorByValidation.fluorescentYearlyMaintSimulator();
    console.log(`Sim By Validation: Fluorescent tubes broken in 1 year: ${ simulationByValidationResults.brokenTubes }`);
    console.log(`Sim By Validation: Fluorescent tubes cost to the University per year per classroom: ${ simulationByValidationResults.cost }`);
    randRaundProvider.resetRound(); // Reset the random rounds for the other simulation to get the same values

    /**
     * Simulation By Decrement
     */
    const simulatorByDecrement = new TubesYearlyMaintSimByDecrement(data);
    const simulationByDecrementResults = simulatorByDecrement.fluorescentYearlyMaintSimulator();
    console.log(`Sim By Decrement: Fluorescent tubes broken in 1 year: ${ simulationByDecrementResults.brokenTubes }`);
    console.log(`Sim By Decrement: Fluorescent tubes cost to the University per year per classroom: ${ simulationByDecrementResults.cost }`);

    /**
     * Prueba de comprobación de valores por tipo de simulación
     */
    /*randRaundProvider.resetRound();
    for ( let i = 0; i < 1000; i++) {
        randRaundProvider.resetRandRounds();
        const simulatorByValidation = new TubesYearlyMaintSimByValidation(data);
        const simulationByValidationResults = simulatorByValidation.fluorescentYearlyMaintSimulator();
        randRaundProvider.resetRound();
        const simulatorByDecrement = new TubesYearlyMaintSimByDecrement(data);
        const simulationByDecrementResults = simulatorByDecrement.fluorescentYearlyMaintSimulator();
        randRaundProvider.resetRound();
        console.log(`index ${ i }: brokenTubes: ${ simulationByValidationResults.brokenTubes != simulationByDecrementResults.brokenTubes ? `Different values V ${ simulationByValidationResults.brokenTubes } D ${ simulationByDecrementResults.brokenTubes }` : `Same values ${ simulationByDecrementResults.brokenTubes }`}`);
        console.log(`index ${ i }: ______costs: ${ simulationByValidationResults.cost != simulationByDecrementResults.cost ? `Different values V ${ simulationByValidationResults.cost } D ${ simulationByDecrementResults.cost }` : `Same values ${ simulationByDecrementResults.cost }`}`);
    };*/
}

main();
