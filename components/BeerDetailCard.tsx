import { Text } from "react-native";
import { Beer } from "./../types/types";

interface BeerDetailCardProps {
  beer: Beer | null;
}

const BeerDetailCard: React.FC<BeerDetailCardProps> = ({ beer }) => {
  return <Text>{beer?.name}</Text>;
};

export default BeerDetailCard;
