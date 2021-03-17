from pyowm import OWM

def weather_report(city):
    API_key = 'ddab7bbcc6c91eafb57fba486cd830bd'
    owm = OWM(API_key)
    mgr = owm.weather_manager()
    obs = mgr.weather_at_place(city)      
    w = obs.weather
    res = w.status 
    return res
    # res1 = w.detailed_status #날씨 상세
