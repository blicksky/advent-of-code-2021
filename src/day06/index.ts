function getNextDayFishAgeCounts(fishAgeCounts: number[]) {
    const nextDayFishAgeCounts = fishAgeCounts.slice();

    fishAgeCounts.forEach((fishAgeCount, age) => {
        if (age === 0) {
            nextDayFishAgeCounts[0] -= fishAgeCount;
            nextDayFishAgeCounts[6] += fishAgeCount;
            nextDayFishAgeCounts[8] += fishAgeCount;
        }
        else {
            nextDayFishAgeCounts[age] -= fishAgeCount;
            nextDayFishAgeCounts[age -1] += fishAgeCount;
        }
    });

    return nextDayFishAgeCounts;
}

export function countFish(inputLines: string[]) {
    const initialFishAges: readonly number[] = inputLines[0]
        .split(',')
        .map((ageString) => parseInt(ageString, 10));

    let fishAgeCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    initialFishAges.forEach((fishAge) => ++fishAgeCounts[fishAge]);

    
    for (let i = 0; i < 256; ++i) {
        fishAgeCounts = getNextDayFishAgeCounts(fishAgeCounts);
    }

    return fishAgeCounts.reduce((sum, i) => sum + i);
}