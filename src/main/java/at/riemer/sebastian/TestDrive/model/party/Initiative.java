package at.riemer.sebastian.TestDrive.model.party;

public enum Initiative {
    SLUGGISH(1),
    RIGID(2),
    DANCING(3),
    WHIRLWIND(5);

    private int value;

    private Initiative(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
