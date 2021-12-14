dotsInput
    .split(/\s+/)
    .reduce((visibleDots, dot) => {
        const [x, y] = dot.split(',');
        visibleDots.add(`${x},${Math.abs(y-655)}`);
        return visibleDots;
    }, new Set());
