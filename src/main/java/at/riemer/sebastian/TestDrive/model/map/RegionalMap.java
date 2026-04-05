package at.riemer.sebastian.TestDrive.model.map;

import at.riemer.sebastian.TestDrive.service.StreetNameLookupService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.List;

public class RegionalMap {

    private static final Logger logger = LoggerFactory.getLogger(RegionalMap.class);

    private  List<List<Block>> blockMap = new ArrayList<>();
    private  String mapFilename;
    private  Map<Integer, List<Texture>> wallTextureSets = new TreeMap<>();
    private  Map<String, Texture> floorTextureMap = new HashMap<>();
    private  Map<String, Texture> roomTextureMap = new HashMap<>();
    private  String skyColor;
    private  String floorColor;
    public RegionalMap(String mapFilename,
                       BufferedImage mapAsImage,
                       BufferedImage streetMapAsImage,
                       BufferedImage floorMapAsImage,
                       BufferedImage ceilingMapAsImage,
                       Resource[] wallResources,
                       Resource[] floorResources,
                       Resource[] roomResources,
                       String skyColor,
                       String floorColor
    ) throws IOException {
        this.mapFilename = mapFilename;
        this.skyColor = skyColor;
        this.floorColor = floorColor;
        initBlockMap(mapAsImage, floorMapAsImage, ceilingMapAsImage, streetMapAsImage);
        initWallTextureSets(wallResources);
        initFloorTextureMap(floorResources);
        initRoomTextureMap(roomResources);
        this.loadWallTextures();

    }

    private void initBlockMap(BufferedImage mapAsImage,
                              BufferedImage floorMapAsImage,
                              BufferedImage ceilingMapAsImage,
                              BufferedImage streetMapAsImage) {
        StreetNameLookupService streetNameLookupService = new StreetNameLookupService();

        for (int y = 0; y < mapAsImage.getHeight() / 3; y++) {
            List<Block> row = new ArrayList<>();
            blockMap.add(row);
            for (int x = 0; x < mapAsImage.getWidth() / 3; x++) {
                // String centerHex = getImagePixelAsHexString(textureMapAsImage, x * 3 + 1, y * 3 + 1);
                String floor = getImagePixelAsHexString(floorMapAsImage, x * 3 + 1, y * 3 + 1);
                String ceiling = getImagePixelAsHexString(ceilingMapAsImage, x * 3 + 1, y * 3 + 1);
                // dungeons
                String centerHexOnStreetMap = getImagePixelAsHexString(streetMapAsImage, x * 3 + 1, y * 3 + 1);
                Block block = new Block(x,
                        y,
                        getImagePixelAsHexString(mapAsImage, x * 3 + 1, y * 3),
                        getImagePixelAsHexString(mapAsImage, x * 3 + 2, y * 3 + 1),
                        getImagePixelAsHexString(mapAsImage, x * 3 + 1, y * 3 + 2),
                        getImagePixelAsHexString(mapAsImage, x * 3, y * 3 + 1),
                        floor,
                        ceiling,
                        streetNameLookupService.getStreetName(centerHexOnStreetMap)
                );
                row.add(block);
            }
        }
    }
    private void loadWallTextures() throws IOException {
        File file = new File("src/main/resources/static/img/worlds/escape_from_the_royal_banquet/wallTextures.json");
        if (!file.exists()) {
            logger.warn("No wallTextures.json found, skipping load.");
            return;
        }
        logger.debug("Loading wall textures from JSON...");
        ObjectMapper mapper = new ObjectMapper();
        List<Map<String, Object>> data = mapper.readValue(
                file,
                new com.fasterxml.jackson.core.type.TypeReference<>() {
                }
        );

        for (Map<String, Object> entry : data) {
            int x = (int) entry.get("x");
            int y = (int) entry.get("y");
            Block block = this.getBlockMap().get(y).get(x);
            Map<String, Map<String, Integer>> walls =
                    (Map<String, Map<String, Integer>>) entry.get("walls");
            apply(block.getNorthWall(), walls.get("north"));
            apply(block.getEastWall(),  walls.get("east"));
            apply(block.getSouthWall(), walls.get("south"));
            apply(block.getWestWall(),  walls.get("west"));
        }
    }

    private void apply(Wall wall, Map<String, Integer> data) {
        if (data != null) {
            wall.setTexture(data.get("set"), data.get("index"));
        }
    }
    private void initWallTextureSets(Resource[] wallResources) {
        Map<Integer, List<Texture>> sets = new TreeMap<>();

        for (Resource res : wallResources) {
            try {
                String path = res.getURL().getPath();
                // example: /static/img/walls/1/0.png
                String[] parts = path.split("/img/walls/")[1].split("/");
                int setId = Integer.parseInt(parts[0]);
                String fileName = parts[1];

                sets.putIfAbsent(setId, new ArrayList<>());

                logger.debug("Adding texture for set " + setId + ": " + fileName);
                sets.get(setId).add(
                        new Texture("img/walls/" + setId + "/" + fileName)
                );
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

        }
        for (List<Texture> list : sets.values()) {
            list.sort(Comparator.comparing(Texture::getFileName));
        }

        this.wallTextureSets = sets;
    }


    private void initFloorTextureMap(Resource[] floorResources) {
        for (int i = 0; i < floorResources.length; i++) {
            this.floorTextureMap.put(
                    FilenameUtils.removeExtension(floorResources[i].getFilename()),
                    new Texture("img/floors/" + floorResources[i].getFilename())
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

    public Map<String, Texture> getRoomTextureMap() {
        return roomTextureMap;
    }

    public Map<String, Texture> getFloorTextureMap() {
        return floorTextureMap;
    }

    public Map<Integer, List<Texture>> getWallTextureSets() {
        return wallTextureSets;
    }

    public String getSkyColor() {
        return skyColor;
    }

    public String getFloorColor() {
        return floorColor;
    }
}
