from flask import Flask
# import os

app = Flask(__name__)

import requests
import json
# maps_api = os.environ.get('GOOGLE_MAPS_API')
maps_api = "AIzaSyBmAabg-5zejuEEsoodJEw11RyIpYLsF7Q"

lower_manhattan = "40.7193%2C-74.0019"
mid_manhattan = "40.7578%2C-73.9856"
up_manhattan = "40.8234%2C-73.9453"
brooklyn = "40.6947%2C-73.9845"
queens = "40.7255%2C-73.7919"
bronx = "40.8423%2C-73.8449"
staten_island = "40.6303%2C-74.1057"


for i in range(10):
    response_API = requests.get(f'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={mid_manhattan}&radius=1500&type=restaurant&key={maps_api}')
    parse_json = response_API.json()
    restaurants = parse_json['results']
    restaurant_name = restaurants[i]['name']

    place_search = requests.get(f'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?&input={restaurant_name}&inputtype=textquery&locationbias=circle%3A2000%40{mid_manhattan}&key={maps_api}')
    new_id = place_search.json()['candidates'][0]['place_id']

    # details = requests.get(f'https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Cformatted_phone_number%2Cwebsite&place_id={new_id}&key={maps_api}')
    photos = requests.get(f'https://maps.googleapis.com/maps/api/place/details/json?fields=photos&place_id={new_id}&key={maps_api}')

    photo_ref = photos.json()['result']['photos'][0]
    photo_url = requests.get(f'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference={photo_ref}&key={maps_api}').url
    print(photo_ref)


    # print(details.json())


# restaurant_seed = {}
# for i in range(0, 20):

#     # print(restaurants[i]['types'])

#     restaurant_seed[i] = {
#         'name': restaurants[i]['name'],
#         'street_address': restaurants[i]['vicinity'],
#         'price_rating': restaurants[i]['price_level'],
#         'img_url': photo_url,
#         'borough': "Manhattan",
#         'accessible': True
#     }

# print(restaurant_seed)
