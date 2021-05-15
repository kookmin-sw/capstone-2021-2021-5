from pyowm import OWM
import requests

def weather_report(lat,lan):
    API_key = 'ddab7bbcc6c91eafb57fba486cd830bd'
    owm = OWM(API_key)
    mgr = owm.weather_manager()
    obs = mgr.weather_at_coords(lat, lan)  
    w = obs.weather
    res = w.status
    return res
    # res1 = w.detailed_status #날씨 상세
# print(weather_report(37.5665,126.9780))





# def get_request_query(url, operation, params, serviceKey):
#     import urllib.parse as urlparse
#     params = urlparse.urlencode(params)
#     request_query = url + '/' + operation + '?' + params + '&' + 'serviceKey' + '=' + serviceKey + '&_type=json'
#     return request_query

# def holiday_check(year,month,day):

#     # 요청 URL과 오퍼레이션
#     URL = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService'
#     OPERATION = 'getHoliDeInfo' # 국경일 + 공휴일 정보 조회 오퍼레이션

#     # 파라미터
#     SERVICEKEY = '5NkuxOEdLG%2BVq%2FcCg5HXXlrtJLuZOdGhoo4c77KOnIvi%2FsZM%2Fjps2Xlz5xq6ObcYMRBWehBZ1UQRSp9zlBSJVA%3D%3D'
#     PARAMS = {'solYear':year, 'solMonth':month}   


#     request_query = get_request_query(URL, OPERATION, PARAMS, SERVICEKEY)
#     response = requests.get(url=request_query)
   
#     holiday=None
#     if True == response.ok:
#         date=int(year+month+day)
#         data=response.json()
        
#         count=data['response']['body']['totalCount']

#         if count != 0:
            
#             if count == 1:
#                 holidays=data['response']['body']['items']['item']
#                 if date == holidays['locdate']:
#                     holiday=holidays['dateName']
#                 return holiday


#             holidays=data['response']['body']['items']['item']
#             for h in holidays:
             
#                 if date == h['locdate']:
#                     holiday=h['dateName']
#                     break
#     return holiday
# print(holiday_check('2021','04','19'))