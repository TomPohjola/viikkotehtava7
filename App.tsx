import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import { WeatherType } from './types/jsonType';
import WeatherInfo from './components/WeatherInfo';

const apikey: String = "09c7fae591739a5dab6057d89d906739"
const { width, height } = Dimensions.get("window"); //haetaan luurin näytön koot, jolla sitten määritellään eri elementtien kokoja dynaamisesti

export default function App() {

  const [city, setCity] = useState<string>("");
  const [temperature, setTemperature] = useState<string>()
  const [wind, setWind] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [iconcode, setIconCode] = useState<string>()

  const iconurl = 'http://openweathermap.org/img/w/' + iconcode + '.png'

  async function fetchWeatherData(): Promise<void> //ei palautusarvoa
  {
    const baseurl = 'https://api.openweathermap.org/data/2.5/weather?q='+city+',Fi&APPID='+apikey+'&units=metric&lang=fi';

    if(city.trim()) //pitää olla jotakin syötettä
  {
    try 
    {
      setTemperature("ladataan") //laitetaan ''ladataan'' tänne aluksi niin käyttäjä näkee että jotakin tapahtuu
      setWind("ladataan")
      setDescription("ladataan")
      setIconCode("")
      console.log(baseurl)

      const res = await fetch(baseurl);
        if (!res.ok)
        {
          console.error(
          `Api virhe, koodi: ${res.status} ${res.statusText}`);
          setTemperature("")
          setWind("")
          setCity("")
          setDescription("")
          setIconCode("")
        }

      const data: WeatherType = await res.json();

      const iconTrimmed = data.weather[0].icon //täytyy poistaa heittomerkit kuvakoodista jotta tulee oikeanlainen url apikutsua varten
      iconTrimmed.replace('"', "")

      setTemperature(data.main.temp+" °C, "+"tuntuu kuin: "+data.main.feels_like+" °C")
      setWind(data.wind.speed+" mps, " +data.wind.deg +" astetta")
      setDescription(data.weather[0].description)
      setIconCode(iconTrimmed)
      setCity("")
      console.log(iconurl)
    } 
    catch (err) 
    {
      console.error('Säätä voitu hakea, tarkista syöte!');
      setTemperature("")
      setWind("")
      setCity("")
      setDescription("")
      setIconCode("")
    }
  }
  else
  {
    setTemperature("")
    setWind("")
    setCity("")
    setDescription("")
    setIconCode("")
  }
}
  return (
    <View style={styles.container}>
      <WeatherInfo
          temperature={temperature}
          wind={wind}
          description={description}
          iconurl={iconurl}
      ></WeatherInfo>
      <TextInput
          style={styles.input}
          onChangeText={setCity}
          value={city}
          placeholder="Hae sää kaupungista"
          keyboardType="numeric"
        />
      <Button
        onPress={fetchWeatherData}
        title="Hae sää"
        color="#841584"
      />
      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: width/2,
    height: height/20,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
