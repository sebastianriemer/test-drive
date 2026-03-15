define([], function () {


    const PartyManager = function () {
        this.partyMembers = [];
        this.init = function(party) {
            for (let i = 0; i < party.partyMembers.length; i++) {
                let partyMember = party.partyMembers[i];
                let portraitImage = new Image();
                portraitImage.src = partyMember.portraitFilename;
                portraitImage.onload = () => {
                    partyMember.portraitImage = portraitImage;
                    this.partyMembers[i] = partyMember;
                }
            }
        }
        this.getParty = function() {
            return this.partyMembers;
        }
        this.getFirstPartyMember = function() {
            return this.partyMembers[0];
        }

    };

    return new PartyManager();
});
