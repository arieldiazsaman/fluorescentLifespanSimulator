import { FluorescentYearlyMaintSimulatorInterface } from "./Interfaces/FluorescentYearlyMaintSimulator"
import RandRaundProvider from "./RandRoundProvider"

export default class TubesYearlyMaintSimByValidation {
    private classroomUnits: number = 4; // fluorescent tube units
    private tubesPerUnit: number = 4; // fluorescent tubes per unit
    private classroomDailyUsage: number = 15; // hours a day
    private classroomWeeklyUsage: number = 5; // times a week
    private classroomMonthlyUsage: number = 9; // months a year
    private tubeWorkTimeMin: number = 100; // tubes min duration
    private tubeWorkTimeMax: number = 200; // tubes max duration
    private tubeFailTolerancePerUnit: number = 2; // amount of tubes that can fail in a unit before replacing every tube in such unit
    private fluorescentTubeCost: number = 7; // fluorescent tube cost per unit
    private randRaundProvider: RandRaundProvider = RandRaundProvider.getInstance();

    constructor(data: FluorescentYearlyMaintSimulatorInterface) {
        if (data?.classroomUnits) this.classroomUnits = data.classroomUnits;
        if (data?.tubesPerUnit) this.tubesPerUnit = data.tubesPerUnit;
        if (data?.classroomDailyUsage) this.classroomDailyUsage = data.classroomDailyUsage;
        if (data?.classroomWeeklyUsage) this.classroomWeeklyUsage = data.classroomWeeklyUsage;
        if (data?.classroomMonthlyUsage) this.classroomMonthlyUsage = data.classroomMonthlyUsage;
        if (data?.tubeWorkTimeMin) this.tubeWorkTimeMin = data.tubeWorkTimeMin;
        if (data?.tubeWorkTimeMax) this.tubeWorkTimeMax = data.tubeWorkTimeMax;
        if (data?.tubeFailTolerancePerUnit) this.tubeFailTolerancePerUnit = data.tubeFailTolerancePerUnit;
        if (data?.fluorescentTubeCost) this.fluorescentTubeCost = data.fluorescentTubeCost;
    }

    private unitYearlyUsageSim({
        classroomYearlyUsage = 0,
    }): { 
        brokenTubes: number, // fluorescent tubes broken in 1 year per unit
        cost: number, // cost of fluorescent tubes per year per classroom per unit
    } {
        const tubeDurations: number[] = [];
        let hoursPassed = this.tubeWorkTimeMin;
        let failedTubes = 0;
        let baseTime = 0; // After all tubes from an unit are replaced, a new baseTime is defined
        let brokenTubes = 0; // Number of broken tubes, not including unbroken tubes that have been changed after the broken tubes limit has been reached in one unit
        let cost = this.fluorescentTubeCost*this.tubesPerUnit; // Takes in account the fluorescent tubes bought before the simulation started

        for ( let i = 0; i < this.tubesPerUnit; i++ ) {
            tubeDurations.push(
                this.randRaundProvider.getRand(
                    this.tubeWorkTimeMin,
                    this.tubeWorkTimeMax,
                    'primary',
                )
            );
        };

        while (hoursPassed <= classroomYearlyUsage) {
            for ( let i = 0; i < this.tubesPerUnit; i++ ) {
                if ( tubeDurations[i] !== -1 && (baseTime + tubeDurations[i]) <= hoursPassed ) {
                    tubeDurations[i] = -1
                    failedTubes++;
                    brokenTubes++;
                };
            };
            if ( failedTubes >= this.tubeFailTolerancePerUnit ) {
                cost = cost + this.fluorescentTubeCost*this.tubesPerUnit;
                for ( let i = 0; i < this.tubesPerUnit; i++ ) {
                    tubeDurations[i] = this.randRaundProvider.getRand(
                        this.tubeWorkTimeMin,
                        this.tubeWorkTimeMax,
                        undefined,
                    );
                };
                baseTime = hoursPassed;
                failedTubes = 0;
            };
            hoursPassed++;
        };
        return {
            brokenTubes,
            cost,
        };
    };
    
    fluorescentYearlyMaintSimulator(): { 
        brokenTubes: number, // fluorescent tubes broken in 1 year
        cost: number, // cost of fluorescent tubes per year per classroom
    } {
        const classroomYearlyUsage = this.classroomDailyUsage * this.classroomWeeklyUsage * 4/*weeks per month*/ * this.classroomMonthlyUsage; // hours a year
        if (classroomYearlyUsage <= this.tubeWorkTimeMin) return {
            brokenTubes: 0,
            cost: 0,
        };
        const unitYearlyUsage: { 
            brokenTubes: number,
            cost: number,
        }[] = [];
    
        for ( let unit = 0; unit < this.classroomUnits; unit++) {
            unitYearlyUsage.push(
                this.unitYearlyUsageSim({ classroomYearlyUsage })
            );
        };

        return unitYearlyUsage.reduce(
            (
                acc: { brokenTubes: number, cost: number },
                current: { brokenTubes: number, cost: number },
            ) => ({
                brokenTubes: acc.brokenTubes + current.brokenTubes,
                cost: acc.cost + current.cost,
            }),
            {
                brokenTubes: 0,
                cost: 0,
            },
        );
    };
}
