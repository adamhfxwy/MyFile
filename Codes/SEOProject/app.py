import os
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

app = Flask(__name__)
CORS(app)  # 允许跨域请求

# 加载Chrome浏览器驱动
def setup_driver():
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')  # 后台运行，不打开浏览器
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(options=options)
    return driver


# 搜索关键词，获取目标网址的排名
def search_keyword(driver, keyword, target_url):
    base_url = "https://www.google.com"
    driver.get(base_url)
    search_box = driver.find_element("name", "q")
    search_box.send_keys(keyword)
    search_box.send_keys(Keys.RETURN)

    time.sleep(2)  # 等待页面加载

    for page in range(1, 6):  # 只搜索前5页
        time.sleep(2)  # 等待结果加载
        results = driver.find_elements("css selector", 'div.g')

        for index, result in enumerate(results):
            try:
                link = result.find_element("tag name", 'a').get_attribute('href')
                if target_url in link:
                    return page, index + 1
            except Exception:
                continue

        # 查找下一页按钮
        try:
            next_button = driver.find_element("id", "pnnext")
            next_button.click()
        except:
            break
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


# Flask 路由，执行主逻辑
@app.route('/run-seo-script', methods=['POST'])
def run_seo_script():
    data = request.json
    print(data)
    input_folder = data['inputFolder']  # 从请求体获取输入文件夹路径
    output_folder = data['outputFolder']  # 从请求体获取输出文件夹路径

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

            write_results_to_file(output_file, keywords, target_url, results)
            print(f"Results written to {output_file}")

    driver.quit()
    return jsonify({"message": "Script executed successfully."})


if __name__ == "__main__":
    app.run(debug=True)
