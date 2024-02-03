import { Text, View } from "react-native";
import BeerList from "@/components/BeerList";

export default function ListScreen(): JSX.Element {
  return (
    <>
      <View>
        <BeerList />
      </View>
    </>
  );
}
