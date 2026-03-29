package at.riemer.sebastian.TestDrive.model.map;
public class Wall {

    private boolean solid;
    private Integer textureSet;
    private Integer textureIndex;

    public Wall(boolean solid) {
        this.solid = solid;
        this.textureSet = null;
        this.textureIndex = null;
    }

    public boolean isSolid() {
        return solid;
    }

    public Integer getTextureSet() {
        return textureSet;
    }

    public Integer getTextureIndex() {
        return textureIndex;
    }

    public void setTexture(Integer set, Integer index) {
        this.textureSet = set;
        this.textureIndex = index;
    }
}