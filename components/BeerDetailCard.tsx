import { Text, View, Image, StyleSheet } from "react-native";
import { Beer } from "./../types/types";

interface BeerDetailCardProps {
  beer: Beer | null;
}

const BeerDetailCard = ({ beer }) => {
  return (
    <View
      accessible={true}
      accessibilityLabel={`Drink Card: ${beer.name}`}
      style={styles.container}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: beer.image_url }}
          style={styles.image}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel={`Image of ${beer.name}`}
        />
        {/* Drink Name */}
        <View
          style={{
            flex: 5,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            margin: 10,
          }}
        >
          <Text
            accessibilityRole="header"
            accessibilityHint="Name of the drink"
            style={styles.name}
          >
            {beer.name}
          </Text>

          {/* Alcohol by Volume (ABV) */}
          <Text
            accessibilityLabel={`The alcohol by volume percentage value for ${beer.name}`}
            style={styles.abv}
          >
            ABV: {beer.abv}%
          </Text>

          {/* Tagline */}
          <Text
            accessibilityLabel={`The tagline for ${beer.name}`}
            style={styles.tagline}
          >
            {beer.tagline}
          </Text>

          {/* Full Description */}
          <Text
            accessibilityLabel={`The description for ${beer.name}`}
            style={styles.description}
          >
            {beer.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    margin: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
    marginHorizontal: 10,
  },
  abv: {
    fontSize: 16,
    marginBottom: 8,
    marginHorizontal: 10,
  },
  tagline: {
    fontStyle: "italic",
    color: "#666",
    marginBottom: 16,
    marginHorizontal: 10,
  },
  description: {
    textAlign: "left",
    marginBottom: 16,
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default BeerDetailCard;
