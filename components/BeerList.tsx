import { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import axios, { AxiosResponse } from "axios";



const BeerList: React.FC = () => {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  console.log("here are the beers", beers);

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
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  }

  return (
    <View>
        {loading && <Text>Loading...</Text>}
      <FlatList
        data={beers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default BeerList;
