import { Text, View } from 'react-native';
import axios, { AxiosResponse } from 'axios';



const BeerList: React.FC = () => {

    const fetchData = async () => {
        try {
            const response: AxiosResponse = await axios.get('https://api.punkapi.com/v2/beers');
            console.log(response.data);

        }   
        catch (error) {
            console.error(error);
        }   
    }
    fetchData();
    


    return (
        <View>
            <Text>Beer List</Text>
        </View>
    )
}

export default BeerList;