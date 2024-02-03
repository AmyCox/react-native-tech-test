import { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import axios, { AxiosResponse } from "axios";
import { AntDesign } from "@expo/vector-icons";

interface Beer {
  name: string;
  id: number;
  image_url: string;
  description: string;
}

const BeerList: React.FC = () => {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(false);
  console.log(" this is the current page", currentPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=10`
        );
        console.log(response.data);
        setBeers(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentPage]);

  const renderPaginationButtons = (increment: boolean, disabled: boolean) => {
    const buttonStyle = disabled
      ? { opacity: 0.2 } // Disabled style
      : {};
    return (
      <>
        <TouchableOpacity
          onPress={() => handlePageClick(increment)}
          accessibilityLabel={`Change to ${
            increment ? "next" : "previous"
          } page`}
          disabled={disabled}
          style={buttonStyle}
          testID={increment ? "pagination-next" : "pagination-previous"}
        >
          <AntDesign
            name={increment ? "rightcircle" : "leftcircle"}
            size={35}
            color={"#8ED2E9"}
          />
        </TouchableOpacity>
      </>
    );
  };

  const handlePageClick = (increment: boolean) => {
    setCurrentPage((prevPage) =>
      increment ? prevPage + 1 : Math.max(prevPage - 1, 1)
    );
  };

  const renderItem = ({ item }: { item: Beer }) => {
    return (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="View details of chosen beer"
        onPress={() => console.log("this works")}
        style={styles.container}
      >
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
          <Text style={styles.name} ellipsizeMode={"tail"} numberOfLines={1}>
            {item.name}
          </Text>
          <Text
            style={styles.description}
            ellipsizeMode={"tail"}
            numberOfLines={1}
          >
            {item.description}
          </Text>
        </View>
        <View style={styles.arrowContainer}>
          <AntDesign name="caretright" size={18} color="#555" />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      {loading ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text>...loading</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={beers}
            initialNumToRender={10}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            testID="beer-flatlist"
            ListFooterComponent={
              <View
                style={{
                  height: 50,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                {renderPaginationButtons(false, currentPage === 1)}
                {renderPaginationButtons(true, nextButtonDisabled)}
              </View>
            }
          />
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
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
  image: {
    width: 40,
    height: 40,
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
  arrowContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    marginLeft: 16,
  },
});

export default BeerList;
