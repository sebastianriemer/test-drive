package at.riemer.sebastian.TestDrive.model.map;

public class Block {
    private final int x;
    private final int y;
    private final Wall northWall;
    private final Wall eastWall;
    private final Wall southWall;
    private final Wall westWall;
    private final String center;
    private final String streetName;
    private final boolean hasNoWalls;

    public Block(int x,
                 int y,
                 String northWall,
                 String eastWall,
                 String southWall,
                 String westWall,
                 String center,
                 String streetName
    ) {
        this.x = x;
        this.y = y;
        this.northWall = new Wall(northWall);
        this.eastWall = new Wall(eastWall);
        this.southWall = new Wall(southWall);
        this.westWall = new Wall(westWall);
        this.center = center;
        this.streetName = streetName;
        this.hasNoWalls = surroundedByWhiteWalls();


    }

    public boolean surroundedByWhiteWalls() {
        return
            northWall.getTexture().equals("ffffff") &&
            eastWall.getTexture().equals("ffffff") &&
            southWall.getTexture().equals("ffffff") &&
            westWall.getTexture().equals("ffffff");
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public Wall getNorthWall() {
        return northWall;
    }

    public Wall getEastWall() {
        return eastWall;
    }

    public Wall getSouthWall() {
        return southWall;
    }

    public Wall getWestWall() {
        return westWall;
    }

    public String getCenter() {
        return center;
    }

    public String getStreetName() {
        return streetName;
    }

    public boolean isHasNoWalls() {
        return hasNoWalls;
    }

    public boolean isHasWalls() {
        return !hasNoWalls;
    }

}
