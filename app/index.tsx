import { Text, SafeAreaView } from "react-native";
import BeerList from "@/components/BeerList";

export default function ListScreen(): JSX.Element {
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
        <BeerList />
      </SafeAreaView>
    </>
  );
}
