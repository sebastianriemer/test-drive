package at.riemer.sebastian.TestDrive.model.items;

import at.riemer.sebastian.TestDrive.model.items.abstr.HandItem;

public class Stiletto implements HandItem {

    private String name = "Stilett";
    private int weight = 15;
    private int value = 100;

    @Override
    public String getName() {
        return null;
    }

    @Override
    public int getWeight() {
        return 0;
    }

    @Override
    public int getValue() {
        return 0;
    }
}
