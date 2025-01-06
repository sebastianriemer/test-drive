package at.riemer.sebastian.TestDrive.model.items;

import at.riemer.sebastian.TestDrive.model.items.abstr.HeadItem;

public class JugglerCap implements HeadItem {

    private String name = "Gauklermütze";
    private int weight = 10;
    private int value = 45;

    @Override
    public String getName() {
        return name;
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
