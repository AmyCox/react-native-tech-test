import { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios, { AxiosResponse } from "axios";

// interface Beer {
//     name: string;
//     id: number;
// }

// interface BeerListProps {
//     item: Beer;
// }

const BeerList: React.FC = () => {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          "https://api.punkapi.com/v2/beers?page=1&per_page=10"
        );
        console.log(response.data);
        setBeers(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
     <TouchableOpacity onPress={() => console.log('this works')} style={styles.container}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View>
        {loading && <Text>Loading...</Text>}
      <FlatList
        data={beers}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "center",
        borderBottomWidth: 1,   
        borderBottomColor: "#eee",
        paddingVertical: 10,
        marginHorizontal: 10,
        backgroundColor: "white",
    }
});

export default BeerList;
