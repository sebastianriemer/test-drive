package at.riemer.sebastian.TestDrive.model.map;

import at.riemer.sebastian.TestDrive.service.StreetNameLookupService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.core.io.Resource;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RegionalMap {
    private List<List<Block>> blockMap = new ArrayList<>();
    private String mapFilename;
    private Map<String, Texture> wallTextureMap = new HashMap<>();
    private Map<String, Texture> roomTextureMap = new HashMap<>();

    public RegionalMap(String mapFilename,
                       BufferedImage textureMapAsImage,
                       BufferedImage streetMapAsImage,
                       Resource[] wallResources,
                       Resource[] roomResources
    ) {
        this.mapFilename = mapFilename;
        initBlockMap(textureMapAsImage, streetMapAsImage);
        initWallTextureMap(wallResources);
        initRoomTextureMap(roomResources);

    }

    private void initBlockMap(BufferedImage textureMapAsImage, BufferedImage streetMapAsImage) {
        StreetNameLookupService streetNameLookupService = new StreetNameLookupService();

        for (int y = 0; y < textureMapAsImage.getHeight() / 3; y++) {
            List<Block> row = new ArrayList<>();
            blockMap.add(row);
            for (int x = 0; x < textureMapAsImage.getWidth() / 3; x++) {
                String centerHex = getImagePixelAsHexString(textureMapAsImage, x * 3 + 1, y * 3 + 1);
                String centerHexOnStreetMap = getImagePixelAsHexString(streetMapAsImage, x * 3 + 1, y * 3 + 1);
                Block block = new Block(x,
                        y,
                        getImagePixelAsHexString(textureMapAsImage, x * 3 + 1, y * 3),
                        getImagePixelAsHexString(textureMapAsImage, x * 3 + 2, y * 3 + 1),
                        getImagePixelAsHexString(textureMapAsImage, x * 3 + 1, y * 3 + 2),
                        getImagePixelAsHexString(textureMapAsImage, x * 3, y * 3 + 1),
                        centerHex,
                        streetNameLookupService.getStreetName(centerHexOnStreetMap)
                );
                row.add(block);
            }
        }
    }

    private void initWallTextureMap(Resource[] wallResources) {
        for (int i = 0; i < wallResources.length; i++) {
            this.wallTextureMap.put(
                    FilenameUtils.removeExtension(wallResources[i].getFilename()),
                    new Texture("img/walls/" + wallResources[i].getFilename())
            );
        }
    }

    private void initRoomTextureMap(Resource[] roomResources) {
        for (int i = 0; i < roomResources.length; i++) {
            this.roomTextureMap.put(
                    FilenameUtils.removeExtension(roomResources[i].getFilename()),
                    new Texture("img/rooms/" + roomResources[i].getFilename())
            );
        }
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

    public String getMapFilename() {
        return mapFilename;
    }

    public void setMapFilename(String mapFilename) {
        this.mapFilename = mapFilename;
    }


    public Map<String, Texture> getWallTextureMap() {
        return wallTextureMap;
    }

    public Map<String, Texture> getRoomTextureMap() {
        return roomTextureMap;
    }

}
