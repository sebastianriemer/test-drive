package at.riemer.sebastian.TestDrive.model.party.character.playerCharacter;

import at.riemer.sebastian.TestDrive.model.items.HandPuppet;
import at.riemer.sebastian.TestDrive.model.items.JugglerCap;
import at.riemer.sebastian.TestDrive.model.items.Stiletto;
import at.riemer.sebastian.TestDrive.model.party.Level;
import at.riemer.sebastian.TestDrive.model.party.character.CharacterStats;
import at.riemer.sebastian.TestDrive.model.party.character.PartyMember;
import at.riemer.sebastian.TestDrive.model.party.character.Sex;
import at.riemer.sebastian.TestDrive.model.party.character.classes.Jester;
import at.riemer.sebastian.TestDrive.model.party.character.classes.Monk;

public class Simon extends PartyMember {


    public Simon() {
        super("Simon", Sex.MALE, "img/characters/small/monk.jpg", new Monk());
        this.withCharacterStats(new CharacterStats(15, 13, 14, 13, 11, 12));
        this.withXpPoints(2000);
        this.withBiography("Simon wuchs im Kloster auf und er traf einen Fisch. Er ist toll. Er sucht " +
                "in seinen Mitmenschen stets nach dem Guten und glaubt an das Gleichgewicht.");
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
