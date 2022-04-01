from flask import Flask, render_template
import requests
import json
response_API = requests.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.7128%2C-74.0060&radius=2000&type=restaurant&key=AIzaSyBmAabg-5zejuEEsoodJEw11RyIpYLsF7Q')
# print(response_API)
data = response_API.text
parse_json = json.loads(data)
restaurants = parse_json['results']
print(parse_json['results'][0]['photos'][0]['photo_reference'])
# my_dict = {}


# for idx in range(10):
#     print(restaurants[idx]['name'], restaurants[idx]['vicinity'], restaurants[idx]['price_level'])

photo_API = requests.get('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=Aap_uEBNfPSzmcuKRldnMgPNs5M7VtZ7Kktjqj_yzlFuUTOp2jDgexwbui25O65WxJ_6BH_Cw26k7V4KZXWqyNKSlRq_eL55QI5SNbrHS835JOMV1w1-upJxegCllqffmrCC0INv8zGeswNszfj1R359Ool8kUx77KWVaMamMSaIDIzneGmp&key=AIzaSyBmAabg-5zejuEEsoodJEw11RyIpYLsF7Q')
print(photo_API)
