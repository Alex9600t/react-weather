import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import moonLogo from '/moon-sleep-svgrepo-com.svg';
import sunLogo from '/sun-fog-svgrepo-com.svg';
import cloudRainLogo from '/cloud-rain-svgrepo-com.svg';
import cloudSnowfallLogo from '/cloud-snowfall-svgrepo-com.svg';
import cloudStormLogo from '/cloud-storm-svgrepo-com.svg';
import cloudSunLogo from '/cloud-sun-svgrepo-com.svg';
import './App.css';

function App() {
  const [time, setTime] = useState(new Date());
  const [additionalData, setAdditionalData] = useState(0);
  const [cloudIconPath, setCloudIconPath] = useState('');
  const apiKey = '1293e8bff0e045eca3d232038240111'; // my token from weatherapi.com
  const [city, setCity] = useState('Россия, Москва');
  const [weatherTemp, setWeatherTemp] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('');
  const [nightObjectClass, setNightOnjectClass] = useState('');
  const [nightLogoClass, setNightLogoClass] = useState('')

  const weatherConditionStatic = [
    'Clear',
    'Partly cloudy',
    'Overcast',
    'Light rain',
    'Moderate rain',
    'Heavy rain',
    'Thunderstorms',
    'Snow',
    'Fog'
  ];

  const changeCity = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
    getWeather(selectedCity);
  };


  const getWeather = async (selectedCity) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${selectedCity || city}&lang=ru`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const data = await response.json();
      setWeatherTemp(`${data.current.temp_c}°C`);
      setWeatherCondition(data.current.condition.text);
      checkWeatherIcon();

    } catch (error) {
      console.error(error);
    }
  };

  const checkWeatherIcon = () => {
    weatherConditionStatic.forEach((el, index) => {
      if (el === weatherCondition) {
        if (index === 0){
          setAdditionalData('');
        } else if (index === 1){
          setAdditionalData('cloudSunLogo');
        } else if (index === 2){
          setAdditionalData('cloudSunLogo');
        } else if (index === 3){
          setAdditionalData('cloudRainLogo');
        } else if (index === 4){
          setAdditionalData('cloudRainLogo');
        } else if (index === 5){
          setAdditionalData('cloudRainLogo');
        } else if (index === 6){
          setAdditionalData('cloudStormLogo');
        } else if (index === 7){
          setAdditionalData('cloudSnowfallLogo');
        } else if (index === 8){
          setAdditionalData('');
        }
      }
    })
  }

  useEffect(() => {
    getWeather();
    setInterval(getWeather, 1800000);

    const interval = setInterval(() => {
      const currentTime = new Date();
      setTime(currentTime);

      const hours = currentTime.getHours();
      if (hours >= 0 && hours <= 5) {
        setCloudIconPath(moonLogo);
        setNightOnjectClass(`object_night`);
        setNightLogoClass(`cloudicon1 logo_night`);

      } else {
        setCloudIconPath(sunLogo);
        setNightOnjectClass('object_day');
        setNightLogoClass(`cloudicon1 logo_day`);
      };

      setAdditionalData(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return (
    <>
      <div>
        <div className={nightObjectClass}>
          <div className="citys">
            <span>Страна и город:⠀
              <select id="country-city" onChange={changeCity} value={city}>
                <option value="Россия, Москва">🇷🇺 Россия, Москва</option>
                <option value="США, Нью Йорк">🇺🇸 США, Нью Йорк</option>
                <option value="Канада, Торонто">🇨🇦 Канада, Торонто</option>
                <option value="Великобритания, Лондон">🇬🇧 Великобритания, Лондон</option>
                <option value="Австралия, Сидней">🇦🇺 Австралия, Сидней</option>
                <option value="Германия, Берлин">🇩🇪 Германия, Берлин</option>
                <option value="Франция, Париж">🇫🇷 Франция, Париж</option>
                <option value="Италия, Рим">🇮🇹 Италия, Рим</option>
                <option value="Испания, Мадрид">🇪🇸 Испания, Мадрид</option>
                <option value="Мексика, Мехико">🇲🇽 Мексика, Мехико</option>
                <option value="Бразилия, Рио-де-Жанейро">🇧🇷 Бразилия, Рио-де-Жанейро</option>
                <option value="Индия, Нью-Дели">🇮🇳 Индия, Нью-Дели</option>
                <option value="Япония, Токио">🇯🇵 Япония, Токио</option>
                <option value="Китай, Пекин">🇨🇳 Китай, Пекин</option>
                <option value="Южная Корея, Сеул">🇰🇷 Южная Корея, Сеул</option>
                <option value="Индонезия, Джакарта">🇮🇩 Индонезия, Джакарта</option>
                <option value="Тайланд, Бангкок">🇹🇭 Тайланд, Бангкок</option>
                <option value="Филиппины, Манила">🇵🇭 Филиппины, Манила</option>
                <option value="Новая Зеландия, Веллингтон">🇳🇿 Новая Зеландия, Веллингтон</option>
                <option value="Южноафриканская Республика, Кейптаун">🇿🇦 ЮАР, Кейптаун</option>
                <option value="Норвегия, Осло">🇳🇴 Норвегия, Осло</option>
                <option value="Швеция, Стокгольм">🇸🇪 Швеция, Стокгольм</option>
                <option value="Дания, Копенгаген">🇩🇰 Дания, Копенгаген</option>
                <option value="Финляндия, Хельсинки">🇫🇮 Финляндия, Хельсинки</option>
                <option value="Ирландия, Дублин">🇮🇪 Ирландия, Дублин</option>
                <option value="Польша, Варшава">🇵🇱 Польша, Варшава</option>
                <option value="Чехия, Прага">🇨🇿 Чехия, Прага</option>
                <option value="Бельгия, Брюссель">🇧🇪 Бельгия, Брюссель</option>
                <option value="Греция, Афины">🇬🇷 Греция, Афины</option>
                <option value="Австрия, Вена">🇦🇹 Австрия, Вена</option>
                <option value="Швейцария, Берн">🇨🇭 Швейцария, Берн</option>
                <option value="Словакия, Братислава">🇸🇰 Словакия, Братислава</option>
                <option value="Словения, Любляна">🇸🇮 Словения, Любляна</option>
                <option value="Хорватия, Загреб">🇭🇷 Хорватия, Загреб</option>
                <option value="Эстония, Таллин">🇪🇪 Эстония, Таллин</option>
                <option value="Латвия, Рига">🇱🇻 Латвия, Рига</option>
                <option value="Литва, Вильнюс">🇱🇹 Литва, Вильнюс</option>
                <option value="Молдавия, Кишинёв">🇲🇩 Молдавия, Кишинёв</option>
                <option value="Румыния, Бухарест">🇷🇴 Румыния, Бухарест</option>
                <option value="Сербия, Белград">🇷🇸 Сербия, Белград</option>
                <option value="Босния и Герцеговина, Сараево">🇧🇦 Босния и Герцеговина, Сараево</option>
                <option value="Черногория, Подгорица">🇲🇪 Черногория, Подгорица</option>
                <option value="Косово, Приштина">🇽🇰 Косово, Приштина</option>
                <option value="Аргентина, Буэнос-Айрес">🇦🇷 Аргентина, Буэнос-Айрес</option>
                <option value="Чили, Сантьяго">🇨🇱 Чили, Сантьяго</option>
                <option value="Первая, Лима">🇵🇪 Перу, Лима</option>
                <option value="Колумбия, Богота">🇨🇴 Колумбия, Богота</option>
                <option value="Уругвай, Монтевидео">🇺🇾 Уругвай, Монтевидео</option>
                <option value="Парагвай, Асунсьон">🇵🇾 Парагвай, Асунсьон</option>
                <option value="Эквадор, Кито">🇪🇨 Эквадор, Кито</option>
                <option value="Венесуэла, Каракас">🇻🇪 Венесуэла, Каракас</option>
                <option value="Демократическая Республика Конго, Киншаса">🇨🇩 ДР Конго, Киншаса</option>
                <option value="Республика Конго, Браззавиль">🇨🇬 Республика Конго, Браззавиль</option>
                <option value="Гана, Аккра">🇬🇭 Гана, Аккра</option>
                <option value="Кения, Найроби">🇰🇪 Кения, Найроби</option>
                <option value="Танзания, Додома">🇹🇿 Танзания, Додома</option>
                <option value="Уганда, Кампала">🇺🇬 Уганда, Кампала</option>
                <option value="Зимбабве, Хараре">🇿🇼 Зимбабве, Хараре</option>
                <option value="Малави, Лилонгве">🇲🇼 Малави, Лилонгве</option>
                <option value="Судан, Хартум">🇸🇩 Судан, Хартум</option>
                <option value="Ливия, Триполи">🇱🇾 Ливия, Триполи</option>
                <option value="Тунис, Тунис">🇹🇳 Тунис, Тунис</option>
                <option value="Алжир, Алжир">🇩🇿 Алжир, Алжир</option>
                <option value="Марокко, Рабат">🇲🇦 Марокко, Рабат</option>
                <option value="Сомали, Могадишо">🇸🇴 Сомали, Могадишо</option>
                <option value="Непал, Катманду">🇳🇵 Непал, Катманду</option>
                <option value="Бангладеш, Дакка">🇧🇩 Бангладеш, Дакка</option>
                <option value="Шри-Ланка, Коломбо">🇱🇰 Шри-Ланка, Коломбо</option>
                <option value="Тайвань, Тайбэй">🇹🇼 Тайвань, Тайбэй</option>
                <option value="Сирия, Дамаск">🇸🇾 Сирия, Дамаск</option>
                <option value="Йемен, Сана">🇾🇪 Йемен, Сана</option>
                <option value="Бахрейн, Манама">🇧🇭 Бахрейн, Манама</option>
                <option value="Катар, Доха">🇶🇦 Катар, Доха</option>
                <option value="Кирибати, Южная Тарава">🇰🇮 Кирибати, Южная Тарава</option>
                <option value="Палау, Нгардмоууд">🇵🇼 Палау, Нгардмоууд</option>
                <option value="Маршалловы Острова, Маджуро">🇲🇭 Маршалловы Острова, Маджуро</option>
                <option value="Науру, Ярен">🇳🇷 Науру, Ярен</option>
                <option value="Тувалу, Фунафути">🇹🇻 Тувалу, Фунафути</option>
                <option value="Сирия, Латакия">🇸🇾 Сирия, Латакия</option>
                <option value="Саудовская Аравия, Эр-Рияд">🇸🇦 Саудовская Аравия, Эр-Рияд</option>
                <option value="Иран, Тегеран">🇮🇷 Иран, Тегеран</option>
                <option value="ОАЭ, Дубай">🇦🇪 ОАЭ, Дубай</option>
                <option value="Ирак, Багдад">🇮🇶 Ирак, Багдад</option>
                <option value="Ливан, Бейрут">🇱🇧 Ливан, Бейрут</option>
                <option value="Кипр, Никосия">🇨🇾 Кипр, Никосия</option>
                <option value="Мальта, Валлетта">🇲🇹 Мальта, Валлетта</option>
                <option value="Грузия, Тбилиси">🇬🇪 Грузия, Тбилиси</option>
                <option value="Армения, Ереван">🇦🇲 Армения, Ереван</option>
                <option value="Азербайджан, Баку">🇦🇿 Азербайджан, Баку</option>
                <option value="Киргизия, Бишкек">🇰🇬 Киргизия, Бишкек</option>
                <option value="Таджикистан, Душанбе">🇹🇯 Таджикистан, Душанбе</option>
                <option value="Узбекистан, Ташкент">🇺🇿 Узбекистан, Ташкент</option>
                <option value="Турция, Анкара">🇹🇷 Турция, Анкара</option>
                <option value="Австралия, Мельбурн">🇦🇺 Австралия, Мельбурн</option>
                <option value="Фиджи, Сува">🇫🇯 Фиджи, Сува</option>

              </select></span>

          </div>
          <div className="localtime">
            <span>
            {hours}:{minutes}:{seconds}
            </span>
          </div>
          <div className="cloudicon">
            <img className={nightLogoClass} src={cloudIconPath} alt="" />
            <img src={setCloudIconPath} alt="" className="cloudicon2" />
          </div>
          <div className="temp">
            <span>{weatherTemp}</span>
          </div>
          <div className="condition">
            <span>{weatherCondition}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
