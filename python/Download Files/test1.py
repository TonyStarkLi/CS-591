from bs4 import BeautifulSoup
import requests

url = 'https://piazza.com/bu/spring2017/cascs112a1/resources'
cookie = 'last_piaz_user=ijmwyhe1h2g2ge; _ga=GA1.2.1483531519.1495572031; _gid=GA1.2.527296334.1495673538; RT=r=https%3A%2F%2Fpiazza.com%2Fbu%2Fspring2017%2Fcascs112a1%2Fresources&nu=https%3A%2F%2Fpiazza.com%2Fbu%2Fspring2017%2Fcascs112a1%2Fresources&cl=1495674647683&ul=1495674647915&hd=1495674648054; piazza_session=tHLyLEyCGGwKuDyLuHvHwyuHyvHEKFvJ.5%25x+x+ux%255M5%22%215%3F5%21%7Cw%265M5%7C%7D%7EG%26%23xG%23%23%25%29%7CMCN%7C%26%7B%2BJ%26%2Ax%2AE%24DL%7DMCN%7C%2CvC%27x%28%7C%25%2BHIvFMCN%7C%2BHI%24%28%24%28-%22KE%23MCN%7DE%24LHGv%7B%24u%2BD%25%7CMCN%7DFEw%7Fw%2A%29%7C%21yJGxMCN5%3F5%27tz5M55%3F5%28%26x%255M5%7C%7D+%2A%2C%7BxD%7BEzEzx5%3F5%2A%7Bx%215MDGLHIJGIKD%3F5%275MD%3F5%23x%25+5MC%3F5%7F%22zz%7C%21zr%7C%215M%27%25%28x%3F5%26x%26%26%7C%22%21r%7Cw5M5Vrab_r%2AJVm%25Z5%3F5x+t%7C%7F5M5%27%22%21%2C%7F%7CSu%28Axw%2850'
headers = {

    'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Mobile Safari/537.36',
    'Connection': 'keep-alive',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Cookie': cookie
}


data = requests.get(url, headers = headers).text

soup = BeautifulSoup(data, 'html.parser')

for link in soup.find_all('script', attrs={'type':'text/javascript'}):
    if 'Course Homepage JS' in list(link):
        print("hi")





