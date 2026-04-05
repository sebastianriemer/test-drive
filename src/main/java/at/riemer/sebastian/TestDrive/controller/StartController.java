package at.riemer.sebastian.TestDrive.controller;

import at.riemer.sebastian.TestDrive.model.Direction;
import at.riemer.sebastian.TestDrive.model.GameState;
import at.riemer.sebastian.TestDrive.model.battle.MonsterGenerator;
import at.riemer.sebastian.TestDrive.model.battle.MonsterGroup;
import at.riemer.sebastian.TestDrive.model.battle.MonsterParty;
import at.riemer.sebastian.TestDrive.model.battle.monster.MonsterRat;
import at.riemer.sebastian.TestDrive.model.map.*;
import at.riemer.sebastian.TestDrive.model.party.Party;
import at.riemer.sebastian.TestDrive.model.party.PartyPosition;
import at.riemer.sebastian.TestDrive.model.party.character.playerCharacter.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class StartController {
    private static final Logger logger = LoggerFactory.getLogger(StartController.class);

    @Autowired
    private ResourcePatternResolver resourcePatternResolver;

    @GetMapping("/")
    public String view(Model model) throws IOException {
        model.addAttribute("nowDateTime", LocalDateTime.now());
        model.addAttribute("version", "0.0.1");

        return "index";
    }

    @GetMapping("/ajax/dashBoard")
    @ResponseBody
    public DashBoard getDashBoard() throws IOException {

        return new DashBoard();
    }

    @GetMapping("/ajax/gameState/{playerName}")
    @ResponseBody
    public GameState getGameState(@PathVariable(required = true) String playerName) throws IOException {
        RegionalMap regionalMap = loadRegionalMap("escape_from_the_royal_banquet");
        BattleMap battleMap = loadBattleMap("escape_from_the_royal_banquet");
        Party party = loadParty();

        MonsterGenerator monsterGenerator = new MonsterGenerator();
        MonsterParty monsterParty = new MonsterParty();
        monsterParty.addFrontCenter(new MonsterGroup(new MonsterRat(), 5));

        GameState gameState = new GameState(
                regionalMap,
                battleMap,
                party
        );
        return gameState;
    }

    @PostMapping("/ajax/map/wallTexture")
    @ResponseBody
    public Map<String, String> updateWallTexture(@RequestBody WallUpdateDTO dto) throws IOException {

        RegionalMap map = getGameState("sebus").getRegionalMap(); // however you store it

        Block block = map.getBlockMap().get(dto.getY()).get(dto.getX());

        Wall wall = switch (dto.getDirection()) {
            case "NORTH" -> block.getNorthWall();
            case "EAST"  -> block.getEastWall();
            case "SOUTH" -> block.getSouthWall();
            case "WEST"  -> block.getWestWall();
            default -> throw new IllegalArgumentException("Invalid direction");
        };

        wall.setTexture(dto.getSet(), dto.getIndex());

        saveMapTextures(map);

        return Map.of("status", "ok");
    }

    private void saveMapTextures(RegionalMap map) throws IOException {

        List<Map<String, Object>> result = new ArrayList<>();

        for (List<Block> row : map.getBlockMap()) {
            for (Block block : row) {

                Map<String, Object> entry = new HashMap<>();
                entry.put("x", block.getX());
                entry.put("y", block.getY());

                Map<String, Object> walls = new HashMap<>();

                addWall(walls, "north", block.getNorthWall());
                addWall(walls, "east",  block.getEastWall());
                addWall(walls, "south", block.getSouthWall());
                addWall(walls, "west",  block.getWestWall());

                entry.put("walls", walls);

                result.add(entry);
            }
        }

        ObjectMapper mapper = new ObjectMapper();

        mapper.writerWithDefaultPrettyPrinter()
                .writeValue(
                        new File("src/main/resources/static/img/worlds/abalon/wallTextures.json"),
                        //new File("wallTextures.json"),
                        result);
    }

    private void addWall(Map<String, Object> walls, String key, Wall wall) {
        if (wall.getTextureSet() != null) {
            walls.put(key, Map.of(
                    "set", wall.getTextureSet(),
                    "index", wall.getTextureIndex()
            ));
        }
    }

    private BufferedImage getImageFromPath(String path) throws IOException {
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream(path);
        return ImageIO.read(inputStream);
    }

    private RegionalMap loadRegionalMap(String mapName) throws IOException {

        RegionalMap regionalMap = new RegionalMap(
                "img/worlds/"+mapName+"/map.png",
                getImageFromPath("static/img/worlds/"+mapName+"/map.png"),
                getImageFromPath("static/img/worlds/"+mapName+"/street_map.png"),
                getImageFromPath("static/img/worlds/"+mapName+"/floor_map.png"),
                getImageFromPath("static/img/worlds/"+mapName+"/ceiling_map.png"),
                resourcePatternResolver.getResources("classpath:static/img/walls/**/*.png"),
                //resourcePatternResolver.getResources("classpath:static/img/walls/*.png"),
                resourcePatternResolver.getResources("classpath:static/img/floors/*.png"),
                resourcePatternResolver.getResources("classpath:static/img/rooms/*.png")
        );
        loadWallTextures(regionalMap);
        return regionalMap;
    }

    private void loadWallTextures(RegionalMap map) throws IOException {

        File file = new File("src/main/resources/static/img/worlds/abalon/wallTextures.json");

        if (!file.exists()) {
            logger.warn("No wallTextures.json found, skipping load.");
            return;
        }

        logger.debug("Loading wall textures from JSON...");

        ObjectMapper mapper = new ObjectMapper();

        List<Map<String, Object>> data = mapper.readValue(
                file,
                new com.fasterxml.jackson.core.type.TypeReference<List<Map<String, Object>>>() {}
        );

        for (Map<String, Object> entry : data) {

            int x = (int) entry.get("x");
            int y = (int) entry.get("y");

            Block block = map.getBlockMap().get(y).get(x);

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

    // TODO: think about whether a textureMap-like initialization really makes sense for a battleMap?
    private BattleMap loadBattleMap(String mapName) throws IOException {
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("static/img/worlds/"+mapName+"/battle_map.png");
        BufferedImage image = ImageIO.read(inputStream);
        BattleMap battleMap = new BattleMap(image,
                "img/worlds/"+mapName+"/battle_map.png",
                resourcePatternResolver.getResources("classpath:static/img/battle/*.png")
        );

        return battleMap;
    }

    private Party loadParty() {
        Party party = new Party();


        party.add(new Otto());
        party.add(new Emma());
        party.add(new Joru());
        party.add(new Laura());
        party.add(new Simon());
        party.add(new Isabella());



        party.setPartyPosition(new PartyPosition(1, 1, Direction.SOUTH));
        return party;
    }
}
