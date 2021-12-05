package at.riemer.sebastian.TestDrive.model.map;

public class Wall {
    private String texture;
    private boolean solid;

    public Wall(String texture) {
        this.texture = texture;
        this.solid = isSolid(texture);
    }

    public String getTexture() {
        return texture;
    }

    public boolean isSolid() {
        return solid;
    }

    private boolean isSolid(String texture) {
        if (texture.equals("ffffff")) {
            return false;
        }
        if (texture.equals("000000")) {
            return false;
        }
        return true;
    }
}
