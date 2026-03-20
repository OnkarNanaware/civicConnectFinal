import csv
import pandas as pd
import math
import random

ward = 1
season = 1
# 1 for summer, 2 for winter, 3 for monsoon
water_usage = 0

no_of_people = [452, 580, 640, 320, 150, 856]

# Create a list to store the data
data = []
for year in range(2015, 2023):
    for ward in range(1, 7):
        people_count = no_of_people[ward - 1]
        for season in range(1, 4):
            if season == 1:
                for week in range(1, 17):
                    isConstruction = math.floor(random.random() * 2)
                    # Generate random temperature between 47 and 53
                    temp = math.floor(random.random() * 5) + 47
                    water_usage = people_count * temp * 7

                    if isConstruction == 1:
                        temp = math.floor(random.random() * 10) + 10
                        water_usage = water_usage * (temp / 100) + water_usage

                    water_usage = math.floor(water_usage)
                    data.append([year, ward, week, people_count, season, isConstruction, water_usage])

            elif season == 2:
                for week in range(18, 35):
                    isConstruction = math.floor(random.random() * 2)
                    # Generate random temperature between 27 and 34
                    temp = math.floor(random.random() * 7) + 27
                    water_usage = people_count * temp * 7

                    if isConstruction == 1:
                        temp = math.floor(random.random() * 10) + 10
                        water_usage = water_usage * (temp / 100) + water_usage

                    water_usage = math.floor(water_usage)
                    data.append([year, ward, week, people_count, season, isConstruction, water_usage])

            else:
                for week in range(35, 53):
                    isConstruction = math.floor(random.random() * 2)
                    # Generate random temperature between 37 and 43
                    temp = math.floor(random.random() * 6) + 37
                    water_usage = people_count * temp * 7

                    if isConstruction == 1:
                        temp = math.floor(random.random() * 10) + 10
                        water_usage = water_usage * (temp / 100) + water_usage

                    water_usage = math.floor(water_usage)
                    data.append([year, ward, week, people_count, season, isConstruction, water_usage])


# Define the file path
file_path = './data.csv'

# Write the data to the CSV file
with open(file_path, 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['Year', 'Ward', 'Week', 'People in Ward', 'Season', 'Construction', 'Water Usage'])
    writer.writerows(data)

print("Data saved to", file_path)
