package at.riemer.sebastian.TestDrive.controller;

import at.riemer.sebastian.TestDrive.TestDriveApplication;
import at.riemer.sebastian.TestDrive.model.*;
import at.riemer.sebastian.TestDrive.model.map.RegionalMap;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Controller
public class StartController {

    @Autowired
    private ResourcePatternResolver resourcePatternResolver;

    @GetMapping("/")
    public String view(Model model) throws IOException {
        model.addAttribute("nowDateTime", LocalDateTime.now());
        model.addAttribute("version", "0.0.1");

        return "index";
    }

    @GetMapping("/ajax/gameState/{playerName}")
    @ResponseBody
    public GameState getGameState(@PathVariable(required = true) String playerName) throws IOException {
        Class clazz = TestDriveApplication.class;
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("static/img/worlds/abalon/map.png");
        BufferedImage image = ImageIO.read(inputStream);
        RegionalMap regionalMap = new RegionalMap(image, "img/worlds/abalon/map.png");
        Map<String, String> wallMap = new HashMap<>();
        Resource[] wallResources = resourcePatternResolver.getResources("classpath:static/img/walls/*.png");
        for (int i = 0; i < wallResources.length; i++) {
            wallMap.put(
                    FilenameUtils.removeExtension(wallResources[i].getFilename()),
                    "img/walls/" + wallResources[i].getFilename()
            );
        }
        Map<String, String> roomMap = new HashMap<>();
        Resource[] roomResources = resourcePatternResolver.getResources("classpath:static/img/rooms/*.png");
        for (int i = 0; i < roomResources.length; i++) {
            roomMap.put(
                    FilenameUtils.removeExtension(roomResources[i].getFilename()),
                    "img/rooms/" + roomResources[i].getFilename()
            );
        }

        Party party = new Party();
        party.addPartyMember(new PartyMember("Carmen", 4, 12, "img/characters/carmen.png"));
        party.addPartyMember(new PartyMember("Josefina", 14, 5, "img/characters/josefina.png"));
        party.addPartyMember(new PartyMember("Maria", 16, 3, "img/characters/maria.png"));
        party.addPartyMember(new PartyMember("Sebi", 8, 10, "img/characters/sebi.png"));
        party.addPartyMember(new PartyMember("Friedrich", 17, 0, "img/characters/bobby.png"));
        party.addPartyMember(new PartyMember("Kalle", 17, 0, "img/characters/kalle.png"));

        party.setPartyPosition(new PartyPosition(1, 1, Direction.NORTH));
        GameState gameState = new GameState(regionalMap, party, wallMap, roomMap);
        return gameState;
    }
}
