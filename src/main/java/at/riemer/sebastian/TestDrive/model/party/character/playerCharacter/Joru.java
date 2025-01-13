package at.riemer.sebastian.TestDrive.model.party.character.playerCharacter;

import at.riemer.sebastian.TestDrive.model.items.HandPuppet;
import at.riemer.sebastian.TestDrive.model.items.JugglerCap;
import at.riemer.sebastian.TestDrive.model.items.Stiletto;
import at.riemer.sebastian.TestDrive.model.party.Level;
import at.riemer.sebastian.TestDrive.model.party.character.PartyMember;
import at.riemer.sebastian.TestDrive.model.party.character.CharacterStats;
import at.riemer.sebastian.TestDrive.model.party.character.Sex;
import at.riemer.sebastian.TestDrive.model.party.character.classes.Jester;

public class Joru extends PartyMember {


    public Joru() {
        super("Joru", Sex.MALE,"img/characters/small/jester.jpg", new Jester());
        this.withCharacterStats(new CharacterStats(13, 11, 18, 16, 8, 13));
        this.withXpPoints(2000);
        this.withBiography("Aufgewachsen in einem Wanderzirkus erlernte Joru das Gauklerleben bis er " +
                "diesen eines Tages für bessere Münze verließ und am Hofe zu Julaya als Narr gastierte. " +
                "Als der König eines Tages entdeckte, dass er seine Spässe gerne auch des Nächtens " +
                "im Bett seiner jüngsten Tochter trieb," +
                "beschloss Joru rasch, dass es Zeit war sich eine neue Anstellung zu suchen.");
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
