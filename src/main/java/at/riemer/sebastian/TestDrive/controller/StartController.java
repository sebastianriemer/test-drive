package at.riemer.sebastian.TestDrive.controller;

import at.riemer.sebastian.TestDrive.model.Direction;
import at.riemer.sebastian.TestDrive.model.GameState;
import at.riemer.sebastian.TestDrive.model.battle.MonsterGenerator;
import at.riemer.sebastian.TestDrive.model.battle.MonsterGroup;
import at.riemer.sebastian.TestDrive.model.battle.MonsterParty;
import at.riemer.sebastian.TestDrive.model.battle.monster.MonsterRat;
import at.riemer.sebastian.TestDrive.model.map.RegionalMap;
import at.riemer.sebastian.TestDrive.model.party.Level;
import at.riemer.sebastian.TestDrive.model.party.Party;
import at.riemer.sebastian.TestDrive.model.party.PartyPosition;
import at.riemer.sebastian.TestDrive.model.party.character.CharacterStats;
import at.riemer.sebastian.TestDrive.model.party.character.PlayerCharacter;
import at.riemer.sebastian.TestDrive.model.party.character.classes.Vampire;
import at.riemer.sebastian.TestDrive.model.party.character.playerCharacter.Denzel;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/ajax/dashBoard")
    @ResponseBody
    public DashBoard getDashBoard() throws IOException {

        return new DashBoard();
    }

    @GetMapping("/ajax/gameState/{playerName}")
    @ResponseBody
    public GameState getGameState(@PathVariable(required = true) String playerName) throws IOException {


        RegionalMap regionalMap = loadRegionalMap();
        Party party = loadParty();

        MonsterGenerator monsterGenerator = new MonsterGenerator();
        MonsterParty monsterParty = new MonsterParty();
        monsterParty.addFrontCenter(new MonsterGroup(new MonsterRat(), 5));

        GameState gameState = new GameState(
                regionalMap,
                party
        );
        return gameState;
    }


    private RegionalMap loadRegionalMap() throws IOException {
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("static/img/worlds/abalon/map.png");
        BufferedImage image = ImageIO.read(inputStream);
        RegionalMap regionalMap = new RegionalMap(image,
                "img/worlds/abalon/map.png",
                resourcePatternResolver.getResources("classpath:static/img/walls/*.png"),
                resourcePatternResolver.getResources("classpath:static/img/rooms/*.png"),
                resourcePatternResolver.getResources("classpath:static/img/battle/*.png")
        );

        return regionalMap;
    }

    private Party loadParty() {
        Party party = new Party();

        PlayerCharacter sebus = new PlayerCharacter(
                "Sebus",
                "img/characters/carmen.png",
                new Vampire()
        ).withCharacterStats(new CharacterStats(14, 13, 15, 12, 6, 6));
        sebus.withCurrentHealth(sebus.getCharacterStats()
                .calcuateMaximumHealth(Level.getLevelAtXpPoints(sebus.getXpPoints())));
        sebus.withCurrentMana(sebus.getCharacterStats()
                .calculateMaximumMana(Level.getLevelAtXpPoints(sebus.getXpPoints()), sebus.getCharacterClass()));

        Denzel denzel = new Denzel();

        party.add(sebus);
        party.add(denzel);

        party.setPartyPosition(new PartyPosition(1, 1, Direction.NORTH));
        return party;
    }
}
