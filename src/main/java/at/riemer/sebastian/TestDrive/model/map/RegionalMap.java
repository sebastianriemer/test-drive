package at.riemer.sebastian.TestDrive.model.map;

import at.riemer.sebastian.TestDrive.service.StreetNameLookupService;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.List;

public class RegionalMap {
    private List<List<Block>> blockMap = new ArrayList<>();
    private String resourceFilename;

    public RegionalMap(BufferedImage image, String resourceFilename) {
        StreetNameLookupService streetNameLookupService = new StreetNameLookupService();
        for (int y = 0; y < image.getHeight() / 3; y ++) {
            List<Block> row = new ArrayList<>();
            blockMap.add(row);
            for (int x = 0; x < image.getWidth() / 3; x ++) {
                String centerHex = getImagePixelAsHexString(image, x*3 + 1, y*3 + 1);

                Block block = new Block(x,
                        y,
                        getImagePixelAsHexString(image, x*3 + 1, y*3),
                        getImagePixelAsHexString(image, x*3 + 2, y*3 + 1),
                        getImagePixelAsHexString(image, x*3 + 1, y*3 + 2),
                        getImagePixelAsHexString(image, x*3, y*3 + 1),
                        centerHex,
                        streetNameLookupService.getStreetName(centerHex)
                );
                row.add(block);
            }
        }
        this.resourceFilename = resourceFilename;
    }

    private String getImagePixelAsHexString(BufferedImage image, int x, int y) {
        Color imagePixelColor = new Color(image.getRGB(x, y));
        String hexString = String.format("%02x%02x%02x",
                imagePixelColor.getRed(),
                imagePixelColor.getGreen(),
                imagePixelColor.getBlue());
        return hexString;
    }

    public List<List<Block>> getBlockMap() {
        return blockMap;
    }

    public void setBlockMap(List<List<Block>> blockMap) {
        this.blockMap = blockMap;
    }

    public String getResourceFilename() {
        return resourceFilename;
    }

    public void setResourceFilename(String resourceFilename) {
        this.resourceFilename = resourceFilename;
    }

}
