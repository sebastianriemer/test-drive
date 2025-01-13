package at.riemer.sebastian.TestDrive.model.party.character.playerCharacter;

import at.riemer.sebastian.TestDrive.model.items.HandPuppet;
import at.riemer.sebastian.TestDrive.model.items.JugglerCap;
import at.riemer.sebastian.TestDrive.model.items.Stiletto;
import at.riemer.sebastian.TestDrive.model.party.Level;
import at.riemer.sebastian.TestDrive.model.party.character.CharacterStats;
import at.riemer.sebastian.TestDrive.model.party.character.PartyMember;
import at.riemer.sebastian.TestDrive.model.party.character.Sex;
import at.riemer.sebastian.TestDrive.model.party.character.classes.Jester;
import at.riemer.sebastian.TestDrive.model.party.character.classes.Shaman;

public class Isabella extends PartyMember {


    public Isabella() {
        super("Isabella", Sex.FEMALE,"img/characters/small/shaman.jpg", new Shaman());
        this.withCharacterStats(new CharacterStats(15, 13, 14, 13, 11, 12));
        this.withXpPoints(2000);
        this.withBiography("Isabella ist tief verwurzelt mit der Natur. Ihr Sinn für Gerechtigkeit"
        + " wird nur vom Wunsch übertroffen, ihren Stamm zu rächen.");
        this.withCurrentHealth(this.getCharacterStats()
                .calcuateMaximumHealth(
                        Level.getLevelAtXpPoints(getXpPoints())
                ));
        this.withCurrentMana(0);
        this.putInLeftHand(new HandPuppet());
        this.putInRightHand(new Stiletto());
        this.putOnHead(new JugglerCap());

    }
}
