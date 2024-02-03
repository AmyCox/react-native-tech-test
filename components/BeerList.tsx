import { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios, { AxiosResponse } from "axios";
import { AntDesign } from "@expo/vector-icons";
import { CenteredSpinner } from "./Spinner";
import { useAppContext } from "../app/AppContext";
import { Beer } from "../types/types";
import { router } from "expo-router";
import ListItem from "./ListItem";

// this component fetches a list of beers from the API and displays them in a FlatList

const BeerList: React.FC = () => {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(false);

  const { dispatch } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=10`
        );
        const hasMoreData = response.data.length < 10;
        setNextButtonDisabled(hasMoreData);
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
      <ListItem
        item={item}
        onPress={() => {
          dispatch({ type: "setBeer", payload: item });
          router.push({
            pathname: "/detailsScreen",
          });
        }}
      />
    );
  };
  return (
    <>
      {loading ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <CenteredSpinner size="large" color="#8ED2E9" />
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
              <View style={styles.paginationContainer}>
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
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "transparent",
  },
});

export default BeerList;
