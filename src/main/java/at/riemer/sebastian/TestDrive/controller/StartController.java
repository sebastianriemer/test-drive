package at.riemer.sebastian.TestDrive.controller;

import at.riemer.sebastian.TestDrive.model.Direction;
import at.riemer.sebastian.TestDrive.model.EscapeTheRoyalBanquet;
import at.riemer.sebastian.TestDrive.model.GameState;
import at.riemer.sebastian.TestDrive.model.World;
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
    public DashBoard getDashBoard() {

        return new DashBoard();
    }

    @GetMapping("/ajax/gameState/{playerName}")
    @ResponseBody
    public GameState getGameState(@PathVariable(required = true) String playerName) throws IOException {
        // Todo: WorldLoader
        EscapeTheRoyalBanquet escapeTheRoyalBanquet = new EscapeTheRoyalBanquet(resourcePatternResolver);
        Party party = loadParty();
        GameState gameState = new GameState(escapeTheRoyalBanquet,
                party
        );
        return gameState;
    }

    @PostMapping("/ajax/map/wallTexture")
    @ResponseBody
    public Map<String, String> updateWallTexture(@RequestBody WallUpdateDTO dto) throws IOException {

        World world = getGameState("sebus").getWorld();

        Block block = world.getRegionalMap().getBlockMap().get(dto.getY()).get(dto.getX());

        Wall wall = switch (dto.getDirection()) {
            case "NORTH" -> block.getNorthWall();
            case "EAST"  -> block.getEastWall();
            case "SOUTH" -> block.getSouthWall();
            case "WEST"  -> block.getWestWall();
            default -> throw new IllegalArgumentException("Invalid direction");
        };

        wall.setTexture(dto.getSet(), dto.getIndex());

        saveMapTextures(world);

        return Map.of("status", "ok");
    }

    private void saveMapTextures(World world) throws IOException {

        List<Map<String, Object>> result = new ArrayList<>();

        for (List<Block> row : world.getRegionalMap().getBlockMap()) {
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
                        new File("src/main/resources/static/img/worlds/"+ world.getMapName() + "/wallTextures.json"),
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

    private Party loadParty() {
        Party party = new Party();
        party.add(new Otto());
        party.add(new Emma());
        party.add(new Joru());
        party.add(new Laura());
        party.add(new Simon());
        party.add(new Isabella());
        party.setPartyPosition(new PartyPosition(4, 2, Direction.EAST));
        return party;
    }
}
