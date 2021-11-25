package at.riemer.sebastian.TestDrive.model.map;

public class Block {
    private final int northWall;
    private final int eastWall;
    private final int southWall;
    private final int westWall;
    private final int center;


    public Block(int northWall,
                 int eastWall,
                 int southWall,
                 int westWall,
                 int center
    ) {
        this.northWall = northWall;
        this.eastWall = eastWall;
        this.southWall = southWall;
        this.westWall = westWall;
        this.center = center;

    }

    public int getNorthWall() {
        return northWall;
    }

    public int getEastWall() {
        return eastWall;
    }

    public int getSouthWall() {
        return southWall;
    }

    public int getWestWall() {
        return westWall;
    }

    public int getCenter() {
        return center;
    }
}
