package at.riemer.sebastian.TestDrive.model.map;

public class Block {
    private final int x;
    private final int y;
    private final Wall northWall;
    private final Wall eastWall;
    private final Wall southWall;
    private final Wall westWall;
    //private final String center;
    private final Floor floor;
    private final Ceiling ceiling;
    private final String streetName;
    private final boolean hasNoWalls;

    public Block(int x,
                 int y,
                 String northWall,
                 String eastWall,
                 String southWall,
                 String westWall,
                 String floor,
                 String ceiling,
                 //String center,
                 String streetName
    ) {
        this.x = x;
        this.y = y;
        this.northWall = new Wall(isWall(northWall));
        this.eastWall  = new Wall(isWall(eastWall));
        this.southWall = new Wall(isWall(southWall));
        this.westWall  = new Wall(isWall(westWall));
        this.floor = new Floor(floor);
        this.ceiling = new Ceiling(ceiling);
        // this.center = center;
        this.streetName = streetName;
        this.hasNoWalls = surroundedByNoWalls();


    }


    private boolean isWall(String hex) {
        return !hex.equals("ffffff"); // white = no wall
    }

    public boolean surroundedByNoWalls() {
        return
            !northWall.isSolid() &&
            !eastWall.isSolid() &&
            !southWall.isSolid() &&
            !westWall.isSolid();
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

    /*public String getCenter() {
        return center;
    }*/

    public Floor getFloor() {
        return floor;
    }

    public Ceiling getCeiling() {
        return ceiling;
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
