package at.riemer.sebastian.TestDrive.controller;

import at.riemer.sebastian.TestDrive.TestDriveApplication;
import at.riemer.sebastian.TestDrive.model.*;
import at.riemer.sebastian.TestDrive.model.map.WorldMap;
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
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("static/img/worlds/map.png");
        BufferedImage image = ImageIO.read(inputStream);
        WorldMap worldMap = new WorldMap(image, "img/worlds/map.png");
        Map<String, String> textureMap = new HashMap<>();
        Resource[] resources = resourcePatternResolver.getResources("classpath:static/img/walls/*.png");
        for (int i=0; i<resources.length; i++) {
            textureMap.put(
                    FilenameUtils.removeExtension(resources[i].getFilename()),
                    "img/walls/" + resources[i].getFilename()
            );
        }


        Party party = new Party();
        party.addPartyMember(new PartyMember("Carmen", 4, 12, "img/characters/carmen.png"));
        party.addPartyMember(new PartyMember("Josefina", 14, 5, "img/characters/josefina.png"));
        party.addPartyMember(new PartyMember("Maria", 16, 3, "img/characters/maria.png"));
        party.addPartyMember(new PartyMember("Sebi", 8, 10, "img/characters/sebi.png"));
        party.addPartyMember(new PartyMember("Friedrich", 17, 0, "img/characters/bobby.png"));
        party.addPartyMember(new PartyMember("Kalle", 17, 0, "img/characters/kalle.png"));

        party.setPartyPosition(new PartyPosition(12, 8, Direction.WEST));
        GameState gameState = new GameState(worldMap, party, textureMap);
        return gameState;
    }
}
