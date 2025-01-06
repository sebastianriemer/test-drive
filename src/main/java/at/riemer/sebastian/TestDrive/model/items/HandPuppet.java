package at.riemer.sebastian.TestDrive.model.items;

import at.riemer.sebastian.TestDrive.model.items.abstr.HandItem;

public class HandPuppet implements HandItem {

    private String name = "Handpuppe";
    private int weight = 3;
    private int value = 20;

    @Override
    public String getName() {
        return name;
    }

    @Override
    public int getWeight() {
        return 3;
    }

    @Override
    public int getValue() {
        return 0;
    }
}
