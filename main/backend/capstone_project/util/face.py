import requests
from io import BytesIO
from PIL import Image, ImageDraw
import cognitive_face as CF
import json
import requests
from bs4 import BeautifulSoup
from random import randint
class FaceClass:
    def __init__(self):
        # self.exciting_song = 'dd'
        # self.sad_song = 'sad'
        KEY = 'fdcf5f7e84904694a6fa3a029ca390d0'  # Cognitive Services API KEY 키값이 있어야 api 호출이 가능
        CF.Key.set(KEY)
        BASE_URL = 'https://koreacentral.api.cognitive.microsoft.com/face/v1.0/'  # 자신의 지역에 해당하는 URL //
        CF.BaseUrl.set(BASE_URL)
        # self.img_url = '/Users/jwl/Desktop/school4-1/capstone/project/capstone-2021-5/main/backend/capstone_project/util/img6.jpg'  # 이미지 파일의 경로
        # self.faces = CF.face.detect(self.img_url, True, False, 'emotion')  # 중요!
        # detect 함수는 4가지의 매개변수를 갖는다.
        # 첫 번째 인자 : 이미지파일
        # 두 번째 인자 : face_id의 반환 여부
        # 세 번째 인자 : landmarks(눈,코,입 등의 위치)의 반환 여부
        # 네 번째 인자 : 반환할 속성(연령,성별 등)
        # recomend_song = ''
    def face(self,input_image):
        faces = CF.face.detect( input_image , True, False, 'emotion')  # 중요!
        for face in faces:
            print(face['faceAttributes']) # 터미널 창에 속성값들을 출력
            emotions = {}
            emotions['anger'] = face['faceAttributes']['emotion']['anger']
            emotions['contempt'] = face['faceAttributes']['emotion']['contempt']
            emotions['disgust'] = face['faceAttributes']['emotion']['disgust']
            emotions['fear'] = face['faceAttributes']['emotion']['fear']
            emotions['happiness'] = face['faceAttributes']['emotion']['happiness']
            emotions['neutral'] = face['faceAttributes']['emotion']['neutral']
            emotions['sadness'] = face['faceAttributes']['emotion']['sadness']
            emotions['surprise'] = face['faceAttributes']['emotion']['surprise']
           
            # bestemotion = max(zip(emotions.values(), emotions.keys()))[1]
            # if bestemotion == 'anger' or 'neutral' or 'contempt':
            #     recomend_song = self.exciting_song
            # else :
            #     recomend_song = self.sad_song
            # doc = {
            #     # 'age': face['faceAttributes']['age'],
            #     'emotion': bestemotion,
            #     # 'recomend_song': recomend_song
            # } # json으로 출력되는 부분
      
        
        # 인식된 얼굴에 네모 박스 그리는 함수 작성
        def getRectangle(faceDictionary):
                rect = faceDictionary['faceRectangle']
                left = rect['left']
                top = rect['top']
                bottom = left + rect['height']
                right = top + rect['width']
                return ((left, top), (bottom, right))

        img = Image.open(input_image) # img 변수에 이미지 파일을 넣어준다.
        draw = ImageDraw.Draw(img)
        for face in faces:
            draw.rectangle(getRectangle(face), outline='red') # 인식된 얼굴들에 네모 박스 쳐주기

        img=img.convert('RGB')


        # print(img)
        # img.show() # 이미지 뷰어로 이미지 띄우기

        # file_path = "./sample.json"
        # with open(file_path, 'w',encoding='utf-8') as outfile:
        #     json.dump(doc, outfile,ensure_ascii=False)
        return emotions,img

# instance = FaceClass()
# instance.face()