package at.riemer.sebastian.TestDrive.model.party.character.playerCharacter;

import at.riemer.sebastian.TestDrive.model.items.HandPuppet;
import at.riemer.sebastian.TestDrive.model.items.JugglerCap;
import at.riemer.sebastian.TestDrive.model.items.Stiletto;
import at.riemer.sebastian.TestDrive.model.party.Level;
import at.riemer.sebastian.TestDrive.model.party.character.CharacterStats;
import at.riemer.sebastian.TestDrive.model.party.character.PartyMember;
import at.riemer.sebastian.TestDrive.model.party.character.Sex;
import at.riemer.sebastian.TestDrive.model.party.character.classes.FortuneTeller;
import at.riemer.sebastian.TestDrive.model.party.character.classes.Shaman;

public class Emma extends PartyMember {


    public Emma() {
        super("Emma", Sex.FEMALE,"img/characters/small/healer.jpg", new FortuneTeller());
        this.withCharacterStats(new CharacterStats(9, 9, 14, 18, 14, 10));
        this.withXpPoints(2000);
        this.withBiography("Emmas Eltern starben kurz nach ihrer Geburt. Daher wuchs sie bei ihrer "
        + "Großmutter auf, die ihr die Kunst der Wahrsagerei beibrachte. Ihre gedankenverlorene und schüchterne Art "
        + "täuscht so Manchen, verfügt sie doch über einen messerscharfen Verstand.");
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
