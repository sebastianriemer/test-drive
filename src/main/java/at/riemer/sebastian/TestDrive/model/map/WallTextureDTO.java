package at.riemer.sebastian.TestDrive.model.map;

public class WallTextureDTO {
    private int x;
    private int y;
    private TextureRef north;
    private TextureRef east;
    private TextureRef south;
    private TextureRef west;

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public TextureRef getNorth() {
        return north;
    }

    public void setNorth(TextureRef north) {
        this.north = north;
    }

    public TextureRef getEast() {
        return east;
    }

    public void setEast(TextureRef east) {
        this.east = east;
    }

    public TextureRef getSouth() {
        return south;
    }

    public void setSouth(TextureRef south) {
        this.south = south;
    }

    public TextureRef getWest() {
        return west;
    }

    public void setWest(TextureRef west) {
        this.west = west;
    }
}