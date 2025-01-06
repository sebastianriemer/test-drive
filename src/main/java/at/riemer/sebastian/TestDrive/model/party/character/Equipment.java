package at.riemer.sebastian.TestDrive.model.party.character;

import at.riemer.sebastian.TestDrive.model.party.character.body.*;

public class Equipment {

    private Head head = new Head();
    private Neck neck = new Neck();
    private Chest chest = new Chest();
    private Arms arms = new Arms();
    private Legs legs = new Legs();
    private Feet feet = new Feet();
    private LeftHand leftHand = new LeftHand();
    private RightHand rightHand = new RightHand();
    private LeftHandRingFinger leftHandRingFinger = new LeftHandRingFinger();
    private RightHandRingFinger rightHandRingFinger = new RightHandRingFinger();
    private Belt belt = new Belt();

    public Head getHead() {
        return head;
    }

    public void setHead(Head head) {
        this.head = head;
    }

    public Neck getNeck() {
        return neck;
    }

    public void setNeck(Neck neck) {
        this.neck = neck;
    }

    public Chest getChest() {
        return chest;
    }

    public void setChest(Chest chest) {
        this.chest = chest;
    }

    public Arms getArms() {
        return arms;
    }

    public void setArms(Arms arms) {
        this.arms = arms;
    }

    public Legs getLegs() {
        return legs;
    }

    public void setLegs(Legs legs) {
        this.legs = legs;
    }

    public Feet getFeet() {
        return feet;
    }

    public void setFeet(Feet feet) {
        this.feet = feet;
    }

    public LeftHand getLeftHand() {
        return leftHand;
    }

    public void setLeftHand(LeftHand leftHand) {
        this.leftHand = leftHand;
    }

    public RightHand getRightHand() {
        return rightHand;
    }

    public void setRightHand(RightHand rightHand) {
        this.rightHand = rightHand;
    }

    public LeftHandRingFinger getLeftHandRingFinger() {
        return leftHandRingFinger;
    }

    public void setLeftHandRingFinger(LeftHandRingFinger leftHandRingFinger) {
        this.leftHandRingFinger = leftHandRingFinger;
    }

    public RightHandRingFinger getRightHandRingFinger() {
        return rightHandRingFinger;
    }

    public void setRightHandRingFinger(RightHandRingFinger rightHandRingFinger) {
        this.rightHandRingFinger = rightHandRingFinger;
    }

    public Belt getBelt() {
        return belt;
    }

    public void setBelt(Belt belt) {
        this.belt = belt;
    }
}
