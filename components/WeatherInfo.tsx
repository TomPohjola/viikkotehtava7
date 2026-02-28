import { Image, Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get("window")

type InfoProps = 
{
    temperature: string | undefined,
    wind: string | undefined,
    description: string | undefined,
    iconurl: string | undefined
}

const WeatherInfo =({temperature, wind, description, iconurl}: InfoProps) => 
    {
        return (
            <View style={styles.container}>
                <View style={styles.weatherinfos}>
                    <Text style={styles.text}> Lämpötila: {temperature}</Text>
                </View>
                <View style={styles.weatherinfos}>
                    <Text style={styles.text}> Tuuli: {wind}</Text>
                </View>
                <View style={styles.weatherinfos}>
                    <Text style={styles.text}>Sää: {description}</Text>
                </View>
                <View style={styles.image}>
                    <Image source={{ width: 150, height: 150,uri: iconurl}}/>
                </View>
            </View>
        )
    }

export default WeatherInfo

const styles = StyleSheet.create({
container: {
    justifyContent: 'center',
    alignItems: 'center'
   },
weatherinfos: {
    borderRadius: 10,
    backgroundColor: '#bdcee6',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: width/1.5,
    height: height/20
  },
  image: {
    borderRadius: 10,
    backgroundColor: '#bdcee6',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: 170,
    height: 170
  },
  text: {
    color: '#33445f',
  }
});

