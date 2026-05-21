import {React,useState} from 'react'
import './App.css'
import cloud from './assets/cloud.png'
import sun from './assets/sun.png'
import rain from './assets/rain.png'
import description from './assets/description.png'




const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    if (!city) {
      setError('Please enter a city name');
      return;
    }
    setError(null);

    const apiKey = '46790ffa7d91ee2c5d461b6b9b330194'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      
  setWeatherData({
    city:data.name,
    temp:data.main.temp,
    description:data.weather[0].description
  });
      console.log(data); // You can process the data as needed
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  


  return (
    
    <div style={{ backgroundImage: `url(${description})`, backgroundSize: 'full', minHeight: '100vh' }} className=" items-center justify-center"  >  
       
      <p className='br-1 solid bg-gray-200 rounded-lg border-1px w-full h-auto p-4'>
      <h1>Weather Forecasting Center</h1>
      </p>
     
      <div className='w-96 h-auto m-4 items-center justify-center '>
        {error && <p className="error">{error}</p>}
        {weatherData && (
          <div className='block-display:block p-7 bg-gray-100 rounded-lg w-full h-auto items-center justify-center'>
    
            <h2>{weatherData.city}  </h2>
            {weatherData.temp < 18 && (
  <img className='w-10' src={rain} alt="Rain" />
)}

{weatherData.temp >= 18 && weatherData.temp < 23 && (
  <img className='w-10' src={cloud} alt="Cloud" />
)}

{weatherData.temp >= 23 && (
  <img className='w-10' src={sun} alt="Sun" />
)}
            <p>Temperature: {weatherData.temp} °C</p>
      
            <p>Description: {weatherData.description}</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center" 
      >
        <div className="block-display:block p-7 bg-gray-100 rounded-lg w-96 h-auto items-center justify-center">
          <h1>Location accepter:</h1>
        <input type="text" placeholder="Enter location"  value={city}
            onChange={(e) => setCity(e.target.value)}
            required /><br />
        <div className="button">
        <button  onClick={fetchWeatherData}>Analysis Weather</button>
        </div>
        </div>
       </div> 

        

    </div>

  );
}

export default App;