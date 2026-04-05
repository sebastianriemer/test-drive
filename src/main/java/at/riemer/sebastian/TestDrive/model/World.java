package at.riemer.sebastian.TestDrive.model;

import at.riemer.sebastian.TestDrive.model.battle.MonsterGenerator;
import at.riemer.sebastian.TestDrive.model.map.BattleMap;
import at.riemer.sebastian.TestDrive.model.map.RegionalMap;
import at.riemer.sebastian.TestDrive.model.party.Party;
import at.riemer.sebastian.TestDrive.model.party.PartyPosition;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;

public interface World {
    String getMapName();

    RegionalMap getRegionalMap();
    BattleMap getBattleMap();
    PartyPosition getStartPosition();
    MonsterGenerator getMonsterGenerator();
    public default BufferedImage getImageFromPath(String path) throws IOException {
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream(path);
        return ImageIO.read(inputStream);
    }

}
