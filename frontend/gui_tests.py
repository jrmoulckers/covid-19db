"""
GUI Tests

Requires:
  $ pip install selenium==3.141.0
  And https://chromedriver.chromium.org/downloads

Reference:
  https://medium.com/@ivantay2003/selenium-cheat-sheet-in-python-87221ee06c83
"""
import unittest
import os
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


BASE_URL = os.environ.get("BASE_URL", "http://localhost:3000")
NO_SELENIUM_WINDOW = (os.environ.get("NO_SELENIUM_WINDOW", "true").lower() == "true")


class TestCovidDBGUI(unittest.TestCase):
    def setUp(self):
        options = webdriver.ChromeOptions()
        if NO_SELENIUM_WINDOW:
            options.add_argument("--disable-extensions")
            options.add_argument("--headless")
            options.add_argument("--disable-gpu")
            options.add_argument("--no-sandbox")
        self.driver = webdriver.Chrome(options=options)
        # increase if pages are taking too long to load
        self.driver.implicitly_wait(3)
        self.driver.get(BASE_URL)

    def test_home_tabs(self):
        home_elem = self.driver.find_element_by_xpath("/html/body/div/ul/li[4]/a")
        self.assertEqual(home_elem.get_attribute("textContent"), "Home")
        abt_elem = self.driver.find_element_by_xpath("/html/body/div/ul/li[6]/a")
        self.assertEqual(abt_elem.get_attribute("textContent"), "About")
        count_elem = self.driver.find_element_by_xpath("/html/body/div/ul/li[8]/a")
        self.assertEqual(count_elem.get_attribute("textContent"), "Countries")
        case_elem = self.driver.find_element_by_xpath("/html/body/div/ul/li[10]/a")
        self.assertEqual(case_elem.get_attribute("textContent"), "Cases")
        risk_elem = self.driver.find_element_by_xpath("/html/body/div/ul/li[12]/a")
        self.assertEqual(risk_elem.get_attribute("textContent"), "Risks")

    def test_about(self):
        self.driver.find_elements_by_link_text("About")[0].click()
        data_btn = self.driver.find_elements_by_link_text("Data")[0]
        data_btn.click()
        data_box = self.driver.find_element_by_xpath("/html/body/div/div/div[2]/div/div[2]/div/div[2]")
        self.assertTrue("For the first phase" in data_box.get_attribute("textContent"))

    def test_country_select(self):
        self.driver.find_elements_by_link_text("Countries")[0].click()
        sig_btn = self.driver.find_elements_by_partial_link_text("Algeria")[0]
        sig_btn.click()
        self.assertEqual(self.driver.current_url, BASE_URL + "/countries/DZA")

    def test_country_instance_explore(self):
        self.driver.find_elements_by_link_text("Countries")[0].click()
        self.driver.find_elements_by_partial_link_text("Algeria")[0].click()
        country_name = self.driver.find_elements_by_tag_name("h1")[0]
        self.assertEqual(country_name.get_attribute("textContent"), " Algeria (DZA)")

    def test_cases_explore(self):
        self.driver.find_elements_by_link_text("Cases")[0].click()
        self.driver.find_elements_by_partial_link_text("Zimbabwe")[0].click()
        self.assertEqual(self.driver.current_url, BASE_URL + "/case-statistics/ZWE")

    def test_case_instance_explore(self):
        self.driver.find_elements_by_link_text("Cases")[0].click()
        self.driver.find_elements_by_partial_link_text("Zimbabwe")[0].click()
        country_name = self.driver.find_elements_by_tag_name("h1")[0]
        self.assertEqual(country_name.get_attribute("textContent"), "Cases in Zimbabwe (ZWE)")

    def test_cases_table_sort(self):
        self.driver.find_elements_by_link_text("Cases")[0].click()
        country_header = self.driver.find_element_by_xpath(
            "/html/body/div[1]/div/div[2]/div/div/div/div/div/div/div/table/thead/tr/th[1]/div/div"
        )
        country_header.click()
        time.sleep(4)
        first_elem = self.driver.find_elements_by_tag_name("td")[0]
        self.assertEqual(first_elem.get_attribute("textContent"), "Afghanistan")

    def test_risk_explore(self):
        self.driver.find_elements_by_link_text("Risks")[0].click()
        self.driver.find_elements_by_partial_link_text("Zimbabwe")[0].click()
        self.assertEqual(self.driver.current_url, BASE_URL + "/risk-factor-statistics/ZWE")

    def test_risk_table_sort(self):
        self.driver.find_elements_by_link_text("Risks")[0].click()
        country_header = self.driver.find_element_by_xpath(
            "/html/body/div[1]/div/div[2]/div/div/div/div/div/div/div/table/thead/tr/th[1]/div/div"
        )
        country_header.click()
        time.sleep(4)
        first_elem = self.driver.find_elements_by_tag_name("td")[0]
        self.assertEqual(first_elem.get_attribute("textContent"), "Afghanistan")

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    try:
        # For linux headless only.
        # OK to fail & ignore when running in development.
        from pyvirtualdisplay import Display

        display = Display(visible=0, size=(800, 800))
        display.start()
    except ImportError as e:
        print('pyvirtualdisplay not found, no virtual display will be created.')
    unittest.main()