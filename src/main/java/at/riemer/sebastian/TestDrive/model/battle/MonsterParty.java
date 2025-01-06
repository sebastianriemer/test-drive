package at.riemer.sebastian.TestDrive.model.battle;

public class MonsterParty {
    private MonsterGroup frontLeft = null;
    private MonsterGroup frontCenter = null;
    private MonsterGroup frontRight = null;
    private MonsterGroup backLeft = null;
    private MonsterGroup backCenter = null;
    private MonsterGroup backRight = null;

    public MonsterParty addFrontLeft(MonsterGroup monsterGroup) {
        this.frontLeft = monsterGroup;
        return this;
    }
    public MonsterParty addFrontRight(MonsterGroup monsterGroup) {
        this.frontRight = monsterGroup;
        return this;
    }
    public MonsterParty addFrontCenter(MonsterGroup monsterGroup) {
        this.frontCenter = monsterGroup;
        return this;
    }
    public MonsterParty addBackLeft(MonsterGroup monsterGroup) {
        this.backLeft = monsterGroup;
        return this;
    }
    public MonsterParty addBackRight(MonsterGroup monsterGroup) {
        this.backRight = monsterGroup;
        return this;
    }
    public MonsterParty addBackCenter(MonsterGroup monsterGroup) {
        this.backCenter = monsterGroup;
        return this;
    }
}
