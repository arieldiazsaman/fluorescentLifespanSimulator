### Description
Create a simulation where in an University, there is a classroom, in that classroom, there are 4 fluorescent tube units, each
unit contains 4 fluorescent tubes.
The classroom is used 15 hours a day, 5 times a week, 9 months a year.
Every fluorescent tube works for a fixed amount of hours, that amount is returned by a function
called "rand()" that returns an integer number from 100 to 200 that represents the number of
hours that the fluorescent tube will work before breaking.
Once 2 fluorescent tubes fail in a single unit, you should replace all 4 tubes.
Each fluorescent tube costs 7 U$D.
The algorithm should print:
1. How many fluorescent tubes were broken in 1 year in that classroom?
2. How much money do fluorescent tubes cost the University per year per classroom

### Instalation
```
git clone https://github.com/arieldiazsaman/fluorescentLifespanSimulator.git
```
```
cd fluorescentLifespanSimulator/
```
```
npm install
```

### Configuration
`CLASSROOM_UNITS`: Fluorescent tube units

`TUBES_PER_UNIT`: Fluorescent tubes per unit

`CLASSROOM_DAILY_USAGE`: Hours a day

`CLASSROOM_WEEKLY_USAGE`: Times a week

`CLASSROOM_MONTHLY_USAGE`: Months a year

`TUBE_WORKING_TIME_MIN`: Tubes min duration

`TUBE_WORKING_TIME_MAX`: Tubes max duration

`TUBE_FAIL_TOLERANCE_PER_UNIT`: Amount of tubes that can fail in a unit before replacing every tube in such unit

`FLUORESCENT_TUBE_COST`: Fluorescent tube cost per unit


### Run code
```
npm start
```

### Run tests
```
npm test
```
