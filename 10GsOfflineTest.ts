const rand = (
    min: number,
    max: number,
): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const unitYearlyUsageSim = ({
    tubesPerUnit = 4,
    tubeWorkTimeMin = 100,
    tubeWorkTimeMax = 200,
    classroomYearlyUsage = 0,
    tubeFailTolerancePerUnit = 2,
    fluorescentTubeCost = 7,
}): { 
    brokenTubes: number, // fluorescent tubes broken in 1 year per unit
    cost: number, // cost of fluorescent tubes per year per classroom per unit
} => {
    const tubeDurations: number[] = [];
    let hoursPassed = tubeWorkTimeMin + 1;
    let failedTubes = 0;
    let baseTime = 0;
    let brokenTubes = 0;
    let cost = 0;

    for ( let i = 0; i < tubesPerUnit; i++ ) {
        tubeDurations.push(
            rand(
                tubeWorkTimeMin,
                tubeWorkTimeMax,
            )
        )
    };

    while (hoursPassed <= classroomYearlyUsage) {
        for ( let i = 0; i < tubesPerUnit; i++ ) {
            if ( tubeDurations[i] !== -1 && (baseTime + tubeDurations[i]) < hoursPassed ) {
                tubeDurations[i] = -1
                failedTubes++;
                brokenTubes++;
            }
        };
        if ( failedTubes >= tubeFailTolerancePerUnit ) {
            cost = cost + fluorescentTubeCost*tubesPerUnit;
            for ( let i = 0; i < tubesPerUnit; i++ ) {
                tubeDurations[i] = rand(
                    tubeWorkTimeMin,
                    tubeWorkTimeMax,
                );
            };
            baseTime = hoursPassed;
        };
        hoursPassed++;
    }
    return {
        brokenTubes,
        cost,
    };
}

// Crear una vlase como para inicializar todos estos valores localmente y no tener que pasarlos uno a uno
const fluorescentYearlyMaintSimulator = ({
    classroomUnits = 4, // fluorescent tube units
    tubesPerUnit = 4, // fluorescent tubes per unit
    classroomDailyUsage = 15, // hours a day
    classroomWeeklyUsage = 5, // times a week
    classroomMonthlyUsage = 9, // months a year
    tubeWorkTimeMin = 100, // tubes min duration
    tubeWorkTimeMax = 200, // tubes max duration
    tubeFailTolerancePerUnit = 2,
    fluorescentTubeCost = 7,
}): { 
    brokenTubes: number, // fluorescent tubes broken in 1 year
    cost: number, // cost of fluorescent tubes per year per classroom
} => {
    const classroomTotalTubes = classroomUnits * tubesPerUnit; // tubes per classroom
    const classroomYearlyUsage = classroomDailyUsage * classroomWeeklyUsage * classroomMonthlyUsage; // hours a year
    const unitYearlyUsage: { 
        brokenTubes: number,
        cost: number,
    }[] = []

    for ( let unit = 0; unit < classroomUnits; unit++) {
        unitYearlyUsage.push(
            unitYearlyUsageSim({
                tubesPerUnit,
                classroomYearlyUsage,
                tubeFailTolerancePerUnit,
                fluorescentTubeCost,
            })
        )
    }

    // usar reduce para devolver el valor
    return {
        brokenTubes: 0,
        cost: 0,
    };
}
