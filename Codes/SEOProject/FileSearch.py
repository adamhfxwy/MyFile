import os
import time
import random
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


# 加载Chrome浏览器驱动
def setup_driver():
    options = webdriver.ChromeOptions()
    #options.add_argument('--headless')  # 后台运行，不打开浏览器
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    #options.add_argument('--incognito')  # 使用无痕模式，避免个性化结果
    driver = webdriver.Chrome(options=options)
    return driver


# 搜索关键词，获取目标网址的排名
def search_keyword(driver, keyword, target_url):
    #base_url = "http://www.google.com/search?q={}&start={}&hl=en&gl=US"  # 设置语言和地区
    base_url = "http://www.google.com/search?q={}&start={}&hl=zh-CN&gl=CN"

    for page in range(5):  # 搜索前5页
        start = page * 10  # 分页参数，第一页为0，第二页为10，以此类推
        search_url = base_url.format(keyword, start)
        driver.get(search_url)  # 直接请求带分页的URL
        time.sleep(5)  # 增加等待时间，模拟人工行为

        results = driver.find_elements("css selector", 'div.g')  # 定位搜索结果
        for index, result in enumerate(results):
            try:
                link = result.find_element("tag name", 'a').get_attribute('href')
                if target_url in link:
                    return page + 1, index + 1  # 页码从1开始，索引从1开始
            except Exception:
                continue

    return None, None  # 如果没有找到结果


# 读取txt文件中的关键词和目标网址
def read_keywords_from_file(filename):
    keywords = []
    with open(filename, 'r') as file:
        lines = file.readlines()
        for line in lines:
            line = line.strip()
            if line and not line.startswith('#'):
                keywords.append(line)
    return keywords


# 将结果写回到文件中
def write_results_to_file(filename, keywords, target_url, results):
    with open(filename, 'w') as file:
        for keyword in keywords:
            if keyword in results:
                page, rank = results[keyword]
                if page is not None and rank is not None:
                    file.write(f"{keyword},@{page}.{rank}\n")
                else:
                    file.write(f"{keyword},Not Found\n")
            else:
                file.write(f"{keyword},Not Found\n")
        file.write(f"\n#目标网址\n{target_url}\n")


# 切换IP的模拟方法
def change_ip():
    ip = random.randint(1, 3)  # 模拟IP变化
    print(f"Changing IP to eth1:{ip}...")
    # 实际情况下需要进行真实的IP切换，这里只是模拟
    time.sleep(2)  # 增加模拟的IP切换时间


def main(input_folder, output_folder):
    driver = setup_driver()

    # 遍历输入文件夹中的所有文件
    for filename in os.listdir(input_folder):
        if filename.endswith(".txt"):  # 只处理txt文件
            input_file = os.path.join(input_folder, filename)
            output_file = os.path.join(output_folder, f"results_{filename}")
            print(f"Processing file: {input_file}")

            keywords = read_keywords_from_file(input_file)
            target_url = keywords[-1]  # 假设最后一行为目标网址
            keywords = keywords[:-1]  # 取出关键词部分

            results = {}
            for keyword in keywords:
                print(f"Searching for '{keyword}'...")
                page, rank = search_keyword(driver, keyword, target_url)
                results[keyword] = (page, rank)
                change_ip()  # 模拟IP切换
                time.sleep(random.randint(5, 10))  # 随机等待时间，避免触发反爬虫

            write_results_to_file(output_file, keywords, target_url, results)
            print(f"Results written to {output_file}")

    #driver.quit()


if __name__ == "__main__":
    input_folder = "E:/MyFiles/MyFile/Codes/SEOProject/input"  # 输入文件夹路径
    output_folder = "E:/MyFiles/MyFile/Codes/SEOProject/output"  # 输出文件夹路径
    main(input_folder, output_folder)
