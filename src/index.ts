import FluorescentYearlyMaintSimulator from './FluorescentYearlyMaintSimulator';
import { FluorescentYearlyMaintSimulatorInterface } from './Interfaces/FluorescentYearlyMaintSimulator';

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
    const simulator = new FluorescentYearlyMaintSimulator(defineConstructorData());
    const simulationResults = simulator.fluorescentYearlyMaintSimulator()
    console.log(`Fluorescent tubes broken in 1 year: ${ simulationResults.brokenTubes }`)
    console.log(`Fluorescent tubes cost to the University per year per classroom: ${ simulationResults.cost }`)
}

main();
