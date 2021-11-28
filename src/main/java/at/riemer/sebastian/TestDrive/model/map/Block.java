package at.riemer.sebastian.TestDrive.model.map;

public class Block {
    private final int x;
    private final int y;
    private final String northWall;
    private final String eastWall;
    private final String southWall;
    private final String westWall;
    private final String center;


    public Block(int x,
                 int y,
                 String northWall,
                 String eastWall,
                 String southWall,
                 String westWall,
                 String center
    ) {
        this.x = x;
        this.y = y;
        this.northWall = northWall;
        this.eastWall = eastWall;
        this.southWall = southWall;
        this.westWall = westWall;
        this.center = center;

    }

    public boolean isEmpty() {
        return
                northWall.equals("ffffff") &&
                eastWall.equals("ffffff") &&
                southWall.equals("ffffff") &&
                westWall.equals("ffffff");
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public String getNorthWall() {
        return northWall;
    }

    public String getEastWall() {
        return eastWall;
    }

    public String getSouthWall() {
        return southWall;
    }

    public String getWestWall() {
        return westWall;
    }

    public String getCenter() {
        return center;
    }
}
