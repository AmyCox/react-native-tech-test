import { Text, View, Image, StyleSheet } from "react-native";
import { Beer } from "./../types/types";

interface BeerDetailCardProps {
  beer: Beer | null;
}

const BeerDetailCard = ({ beer }) => {
  return (
    <View accessible={true} accessibilityLabel={`Drink Card: ${beer.name}`}>
      <View>
        <Image
          source={{ uri: beer.image_url }}
          style={styles.image}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel={`Image of ${beer.name}`}
        />
        <Text style={styles.name}>{beer.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default BeerDetailCard;
