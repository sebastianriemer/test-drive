package at.riemer.sebastian.TestDrive.model.party.character.playerCharacter;

import at.riemer.sebastian.TestDrive.model.items.HandPuppet;
import at.riemer.sebastian.TestDrive.model.items.JugglerCap;
import at.riemer.sebastian.TestDrive.model.items.Stiletto;
import at.riemer.sebastian.TestDrive.model.party.Level;
import at.riemer.sebastian.TestDrive.model.party.character.CharacterStats;
import at.riemer.sebastian.TestDrive.model.party.character.PartyMember;
import at.riemer.sebastian.TestDrive.model.party.character.Sex;
import at.riemer.sebastian.TestDrive.model.party.character.classes.Jester;
import at.riemer.sebastian.TestDrive.model.party.character.classes.Medusa;

public class Laura extends PartyMember {


    public Laura() {
        super("Laura", Sex.FEMALE,"img/characters/small/medusa.jpg", new Medusa());
        this.withCharacterStats(new CharacterStats(9, 8, 11, 17, 16, 9));
        this.withXpPoints(2000);
        this.withBiography("Laura kommt aus Australien. Bei ihrer Reise über das Meer sank ihr Schiff und sie allein überlebte." +
                "Die Erzählungen über ihr früheres Leben sind genauso verworren, wie ihr Haar.");
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
