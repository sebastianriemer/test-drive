package at.riemer.sebastian.TestDrive.model.map;

import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.List;

public class WorldMap {
    private List<List<Block>> blockMap = new ArrayList<>();

    public WorldMap(BufferedImage image) {
        for (int y = 0; y < image.getHeight(); y+=3) {
            List<Block> row = new ArrayList<>();
            blockMap.add(row);
            for (int x = 0; x < image.getWidth(); x+=3) {
                Block block = new Block(
                        image.getRGB(x+1, y),
                        image.getRGB(x+2, y+1),
                        image.getRGB(x+1, y+2),
                        image.getRGB(x, y+1),
                        image.getRGB(x+1, y+1)
                );
                row.add(block);
            }
        }
    }

    public List<List<Block>> getBlockMap() {
        return blockMap;
    }

    public void setBlockMap(List<List<Block>> blockMap) {
        this.blockMap = blockMap;
    }
}
