import csv
import pandas as pd
import math
import random

ward = 1
season = 1
# 1 for summer, 2 for winter, 3 for monsoon
electricity_usage = 0
no_of_people = [452, 580, 640, 320, 150, 856]
festive_week = [41,42,45,48,52]

# Create a list to store the data
data = []
for year in range(2015, 2023):
    for ward in range(1, 7):
        people_count = no_of_people[ward - 1]
        for season in range(1, 4):
            if season == 1:
                for week in range(1, 17):
                    isConstruction = random.randint(0, 1)
                    # Generate random temperature between 47 and 53
                    temp = random.uniform(47, 53)
                    electricity_usage = people_count * temp * 7

                    if isConstruction == 1:
                        temp = random.uniform(10, 20)
                        electricity_usage = electricity_usage * (1 + temp / 100)

                    electricity_usage = math.floor(electricity_usage)
                    data.append([year, ward, week, people_count, 0, isConstruction, electricity_usage])

            elif season == 3:
                for week in range(18, 35):
                    isConstruction = random.randint(0, 1)
                    # Generate random temperature between 27 and 34
                    temp = random.uniform(27, 34)
                    electricity_usage = people_count * temp * 7

                    if isConstruction == 1:
                        temp = random.uniform(5, 15)
                        electricity_usage = electricity_usage * (1 + temp / 100)

                    electricity_usage = math.floor(electricity_usage)
                    data.append([year, ward, week, people_count, 0, isConstruction, electricity_usage])

            else:
                for week in range(35, 53):
                    if week in festive_week:
                        factor = random.uniform(1, 5)
                    else:
                        factor = 1
                    isConstruction = random.randint(0, 1)
                    # Generate random temperature between 37 and 43
                    temp = random.uniform(37, 43)
                    electricity_usage = people_count * temp * 7

                    if isConstruction == 1:
                        temp = random.uniform(10, 20)
                        electricity_usage = electricity_usage * (1 + temp / 100) * factor

                    electricity_usage = math.floor(electricity_usage)
                    data.append([year, ward, week, people_count, 1 if week in festive_week else 0, isConstruction, electricity_usage])

# Define the file path
file_path = './data.csv'

# Write the data to the CSV file
with open(file_path, 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['Year', 'Ward', 'Week', 'People in Ward', 'Festive Season', 'Construction', 'Electricity Usage'])
    writer.writerows(data)

print("Data saved to", file_path)
