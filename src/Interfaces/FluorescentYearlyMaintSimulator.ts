export interface FluorescentYearlyMaintSimulatorInterface {
    classroomUnits: number | null;
    tubesPerUnit: number | null;
    classroomDailyUsage: number | null;
    classroomWeeklyUsage: number | null;
    classroomMonthlyUsage: number | null;
    tubeWorkTimeMin: number | null;
    tubeWorkTimeMax: number | null;
    tubeFailTolerancePerUnit: number | null;
    fluorescentTubeCost: number | null;
};
