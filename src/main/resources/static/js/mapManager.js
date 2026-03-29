define([], function () {
    const MapManager = function () {
        this.regionalMap = {};
        this.battleMap = {};
        this.partyMembers = [];

        this.initRegionalMap = function(regMap, partyPosition) {
               this.regionalMap.mapData = regMap;
               this.regionalMap.partyPosition = partyPosition;
               let mapImage = new Image();
               mapImage.src = this.regionalMap.mapData.mapFilename;
               mapImage.onload = () => {
                   this.regionalMap.mapImage = mapImage
               }

           }

           this.initBattleMap = function(batMap) {
               this.battleMap.mapData = batMap;
               let mapImage = new Image();
               mapImage.src = this.battleMap.mapData.mapFilename;
               mapImage.onload = () => {
                   this.battleMap.mapImage = mapImage
               }
           }

           /*this.initParty = function(party) {
               for (let i = 0; i < party.partyMembers.length; i++) {
                   let partyMember = party.partyMembers[i];
                   let portraitImage = new Image();
                   portraitImage.src = partyMember.portraitFilename;
                   portraitImage.onload = () => {
                       partyMember.portraitImage = portraitImage;
                       this.partyMembers[i] = partyMember;
                   }
               }
           }*/
           this.getBlockFromRegionalMap = function() {
               return this.regionalMap.mapData.blockMap[this.regionalMap.partyPosition.y][this.regionalMap.partyPosition.x];
           }

           this.getBlockFromBattleMap = function() {
               return this.battleMap.mapData.blockMap[this.regionalMap.partyPosition.y][this.regionalMap.partyPosition.x];
           }

           this.getInvertedDirection = function(direction) {
               switch (direction) {
                 case 'NORTH':
                   return 'SOUTH';
                 case 'EAST':
                   return 'WEST';
                 case 'SOUTH':
                   return 'NORTH';
                 case 'WEST':
                   return 'EAST';
                 default:
                   console.error(`Invalid direction! direction:'${direction}'`);
               }
           }
    }
    return new MapManager();

});