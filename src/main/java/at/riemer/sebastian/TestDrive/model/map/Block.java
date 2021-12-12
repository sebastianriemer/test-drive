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
}
