import TubesYearlyMaintSimByValidation from '../src/TubesYearlyMaintSimByValidation';

describe('FluorescentYearlyMaintSimulator', () => {
  let simulator: TubesYearlyMaintSimByValidation;
  let data = {
    classroomUnits: 4,
    tubesPerUnit: 4,
    classroomDailyUsage: 15,
    classroomWeeklyUsage: 5,
    classroomMonthlyUsage: 9,
    tubeWorkTimeMin: 100,
    tubeWorkTimeMax: 200,
    tubeFailTolerancePerUnit: 2,
    fluorescentTubeCost: 7,
  };

  beforeEach(() => {
    simulator = new TubesYearlyMaintSimByValidation(data);
  });

  test('fluorescentYearlyMaintSimulator result calculation', () => {
    const result = simulator.fluorescentYearlyMaintSimulator();
    const resultMagnitude = ((result?.cost - data.fluorescentTubeCost*data.tubesPerUnit*data.classroomUnits)/data.fluorescentTubeCost)/data.tubeFailTolerancePerUnit
    expect(result.brokenTubes >= resultMagnitude && result.brokenTubes <= (resultMagnitude + data.tubesPerUnit)).toBeTruthy();
    /**
     * Where:
     *  resultMagnitude is the minimum number of broken tubes, and
     *  resultMagnitude + data.tubesPerUnit is the maximum number of broken tubes
     * that can occur based on the resultant cost.
     */
  });

  test('should instantiate correctly', () => {
    expect(simulator).toBeInstanceOf(TubesYearlyMaintSimByValidation);
  });

  test('should call spyUnitYearlyUsageSim function "classroomUnits" times', () => {
    const spyUnitYearlyUsageSim = jest.spyOn(TubesYearlyMaintSimByValidation.prototype as any, 'unitYearlyUsageSim');
    simulator.fluorescentYearlyMaintSimulator();

    expect(spyUnitYearlyUsageSim).toHaveBeenCalledTimes(data.classroomUnits);
  });
});
