#!/usr/bin/env python

import requests
import dotenv
import os
import json

try:
  location = requests.get('http://ip-api.com/json/?lang=ru&fields=57552').json()

  dotenv.load_dotenv()
  KEY = os.getenv('WEATHER_API_KEY')

  weather = requests.get(f'https://api.openweathermap.org/data/2.5/weather?lat={location['lat']}&lon={location['lon']}&units=metric&lang=ru&appid={KEY}').json()

  statuses = [str(status['id']) for status in weather['weather']]
  death_statuses = ['781', '762', '622', '602', '522', '504', '503', '502', '314', '312', '302', '232', '212', '202']

  real_temp = weather['main']['temp']
  feel_temp = weather['main']['feels_like']

  result = {
    'available': True,
    'city': location['city'],
    'real_temp': real_temp,
    'feel_temp': feel_temp,
    'death': feel_temp < -25 or feel_temp > 28 or any(status in death_statuses for status in statuses),
    'thunder': any(status.startswith('2') for status in statuses),
    'snow': any(status.startswith('6') for status in statuses),
    'rain': any(status.startswith(('3', '5')) for status in statuses),
    'clouds': weather['clouds']['all'] > 25,
  }

  print(json.dumps(result))

except Exception:
  print(json.dumps({ 'available': False }))
