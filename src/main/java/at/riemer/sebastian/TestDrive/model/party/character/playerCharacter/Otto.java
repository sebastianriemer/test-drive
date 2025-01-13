package at.riemer.sebastian.TestDrive.model.party.character.playerCharacter;

import at.riemer.sebastian.TestDrive.model.items.HandPuppet;
import at.riemer.sebastian.TestDrive.model.items.JugglerCap;
import at.riemer.sebastian.TestDrive.model.items.Stiletto;
import at.riemer.sebastian.TestDrive.model.party.Level;
import at.riemer.sebastian.TestDrive.model.party.character.CharacterStats;
import at.riemer.sebastian.TestDrive.model.party.character.PartyMember;
import at.riemer.sebastian.TestDrive.model.party.character.Sex;
import at.riemer.sebastian.TestDrive.model.party.character.classes.Mercenary;
import at.riemer.sebastian.TestDrive.model.party.character.classes.Shaman;

public class Otto extends PartyMember {


    public Otto() {
        super("Otto", Sex.MALE, "img/characters/small/mercenary.jpg", new Mercenary());
        this.withCharacterStats(new CharacterStats(19, 20, 15, 8, 6, 6));
        this.withXpPoints(2000);
        this.withBiography("Otto verbrachte viel Zeit in der Armee und kommt aus Afrika. Dort wuchs er als Sohn eines "
        + "ranghohen Adeligen auf. Er ist kein Mann der großen Worte, sondern lässt lieber seine Fäuste sprechen.");
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
