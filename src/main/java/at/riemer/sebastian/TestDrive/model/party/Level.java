package at.riemer.sebastian.TestDrive.model.party;

import java.util.Optional;

public enum Level {
    ONE(1000),
    TWO(2000),
    THREE(4000),
    FOUR(8000),
    FIVE(15000),
    SIX(30000),
    SEVEN(50000),
    EIGHT(75000),
    NINE(125000),
    TEN(200000);

    private int xpPoints;

    private Level(int xpPoints) {
        this.xpPoints = xpPoints;
    }

    public static Level getLevelAtXpPoints(int xpPoints) {
        for (Level level : Level.values()) {
            Optional<Level> maybeLevel = getLevelIfXpBelow(xpPoints, level);
            if (maybeLevel.isPresent()) {
                return maybeLevel.get();
            }
        }
        return Level.TEN;
    }

    private static Optional<Level> getLevelIfXpBelow(int xpPoints, Level level) {
        if (xpPoints < level.xpPoints) {
            return Optional.of(level);
        }
        return Optional.empty();
    }


}
