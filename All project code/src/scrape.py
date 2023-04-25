import requests;
from bs4 import BeautifulSoup;

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:55.0) Gecko/20100101 Firefox/55.0',
}

URL = 'https://connect2concepts.com/connect2/?type=circle&key=11EEE07F-7BED-418E-B7F7-547D2BB046F5'
page = requests.get(URL,headers=headers)

soup = BeautifulSoup(page.content, "html.parser")

print(soup.prettify())
print(soup.title)
for di in soup.find_all("div", {"style": "text-align:center;"}):
    print(di.get_text(separator="|"))