package at.riemer.sebastian.TestDrive.service;

import java.util.HashMap;
import java.util.Map;

public class StreetNameLookupService {

    private Map<String, String> hexToStreetNameMap = new HashMap<>();

    public StreetNameLookupService() {
        hexToStreetNameMap.put("7785ff", "Aqabat Anim Straße");
        hexToStreetNameMap.put("00ffd8", "Hurva-Platz");
        hexToStreetNameMap.put("6bcbff", "Suq der Farben");
        hexToStreetNameMap.put("ff804f", "Ketten-Tor-Straße");
        hexToStreetNameMap.put("66ffed", "Am Syllabus");
        hexToStreetNameMap.put("ffac7c", "Marsch des Himmels");
        hexToStreetNameMap.put("ff3a3a", "Heldenplatz");
        hexToStreetNameMap.put("ff99f6", "Krämergasse");
        hexToStreetNameMap.put("d19eff", "Roter Turm");
        hexToStreetNameMap.put("38ff3e", "Winkeltreppe");
        hexToStreetNameMap.put("96ff4c", "Takija-Straße");
        hexToStreetNameMap.put("ff0c00", "Badgasse");
        hexToStreetNameMap.put("3f85ff", "Trompetenstraße");
        hexToStreetNameMap.put("523fff", "Weg der Christen");
        hexToStreetNameMap.put("ff7e1c", "Platz des Friedens");
        hexToStreetNameMap.put("ffe960", "Im Kabuk");
        hexToStreetNameMap.put("ff667c", "Der Fischer");
        hexToStreetNameMap.put("55ff38", "Barquqgasse");
        hexToStreetNameMap.put("ff1cd1", "Hieronymusweg");
    }

    public String getStreetName(String hexColor) {
        if (hexToStreetNameMap.get(hexColor) != null) {
            return hexToStreetNameMap.get(hexColor);
        }
        return "???";
    }
}
