import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Beer } from "../types/types";

interface ListItemProps {
  item: Beer;
  onPress: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`View of details of ${item.name}`}
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <View style={styles.circleContainer}>
          <Image
            source={{ uri: item.image_url }}
            style={styles.image}
            resizeMode="contain"
            accessible={true}
            accessibilityLabel={`Image of ${item.name}`}
          />
        </View>
        <View style={styles.textContainer}>
          <Text
            ellipsizeMode={"tail"}
            numberOfLines={1}
            style={styles.name}
            accessibilityLabel={`Name: ${item.name}`}
          >
            {item.name}
          </Text>
          <Text
            ellipsizeMode={"tail"}
            numberOfLines={1}
            style={styles.description}
            accessibilityLabel={`Description: ${item.description}`}
          >
            {item.description}
          </Text>
        </View>
        <View style={styles.arrowContainer}>
          <AntDesign name="caretright" size={18} color="#555" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "white",
    flex: 1,
  },
  imageContainer: {
    marginRight: 16,
    flexDirection: "row",
  },
  circleContainer: {
    width: 42,
    height: 42,
    borderRadius: 30,
    overflow: "hidden",
    marginRight: 16,
    backgroundColor: "rgba(142, 210, 233, 0.6)", // Adjust the alpha (0.8) as needed
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  arrowContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    marginLeft: 16,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  textContainer: {
    flexDirection: "column",
    paddingLeft: 16,
    flex: 9,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});

export default ListItem;
