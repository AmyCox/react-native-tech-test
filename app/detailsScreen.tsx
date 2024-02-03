import { View, Text } from "react-native";
import  BeerDetailCard from "../components/BeerDetailCard";
import { useAppContext } from "../app/AppContext";

const Details: React.FC = () => {
  const { state } = useAppContext();
  const beer = state.selectedBeer;
  console.log('here is the beer', beer)
  return (
    <View style={{flex: 1}}>
    
      <BeerDetailCard beer={beer} />
    </View>
  );
};

export default Details;
