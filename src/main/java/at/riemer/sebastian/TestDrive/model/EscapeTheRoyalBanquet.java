package at.riemer.sebastian.TestDrive.model;

import at.riemer.sebastian.TestDrive.model.battle.MonsterGenerator;
import at.riemer.sebastian.TestDrive.model.map.BattleMap;
import at.riemer.sebastian.TestDrive.model.map.RegionalMap;
import at.riemer.sebastian.TestDrive.model.party.PartyPosition;
import org.springframework.core.io.support.ResourcePatternResolver;

import javax.imageio.ImageIO;
import java.io.IOException;
import java.util.Objects;

public final class EscapeTheRoyalBanquet implements World {
    private PartyPosition  startPostion;
    private BattleMap battleMap;
    private String mapName;
    private RegionalMap regionalMap;
    private MonsterGenerator monsterGenerator;

    public EscapeTheRoyalBanquet(ResourcePatternResolver resourcePatternResolver) throws IOException {
        this.mapName = "escape_from_the_royal_banquet";
        this.regionalMap = new RegionalMap(
                "img/worlds/" + mapName + "/map.png",
                getImageFromPath("static/img/worlds/" + mapName + "/map.png"),
                getImageFromPath("static/img/worlds/" + mapName + "/street_map.png"),
                getImageFromPath("static/img/worlds/" + mapName + "/floor_map.png"),
                getImageFromPath("static/img/worlds/" + mapName + "/ceiling_map.png"),
                resourcePatternResolver.getResources("classpath:static/img/walls/**/*.png"),
                //resourcePatternResolver.getResources("classpath:static/img/walls/*.png"),
                resourcePatternResolver.getResources("classpath:static/img/floors/*.png"),
                resourcePatternResolver.getResources("classpath:static/img/rooms/*.png"),
                "#000000",
                "#000000"
        );
        this.battleMap = new BattleMap(
                ImageIO.read(
                        Objects.requireNonNull(getClass().getClassLoader().getResourceAsStream(
                                "static/img/worlds/" + mapName + "/battle_map.png"))
                ),
                "img/worlds/" + mapName + "/battle_map.png",
                resourcePatternResolver.getResources("classpath:static/img/battle/*.png")
        );
        this.monsterGenerator =  new MonsterGenerator();
        this.startPostion = new PartyPosition(1,1, Direction.SOUTH);
    }

    public String getMapName() {
        return mapName;
    }

    @Override
    public RegionalMap getRegionalMap() {
        return regionalMap;
    }

    @Override
    public BattleMap getBattleMap() {
        return battleMap;
    }

    @Override
    public MonsterGenerator getMonsterGenerator() {
        return monsterGenerator;
    }

    @Override
    public PartyPosition getStartPosition() {
        return startPostion;
    }
}
