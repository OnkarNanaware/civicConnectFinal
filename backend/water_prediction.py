import pandas as pd
from sklearn.ensemble import RandomForestRegressor

# Load numerical data into a DataFrame
data = pd.read_csv('dataset_water.csv')
def predictWater(people_in_ward,season,construction):
    # Select only specific columns as features
    selected_features = ['People in Ward', 'Season', 'Construction']  # List of column names you want to include
    X = data[selected_features]

    # Select the target variable
    y = data['Water Usage']

    # Initialize and train Random Forest model using 100% of the data
    rf_regressor = RandomForestRegressor(n_estimators=100, random_state=42)
    rf_regressor.fit(X, y)

    # Make predictions using user input
    input_data = pd.DataFrame({
        'People in Ward': [people_in_ward],
        'Season': [season],
        'Construction': [construction]
    })

    # Encode categorical variables
    input_data['Season'] = input_data['Season'].map({'Winter': 0, 'Summer': 1, 'Rainy': 2, 0: 0, 1: 1, 2: 2})
    input_data['Construction'] = input_data['Construction'].map({True: 1, False: 0, 'True': 1, 'False': 0, 1: 1, 0: 0})

    print (input_data)
    # Predict water utilization
    predicted_utilization = rf_regressor.predict(input_data)[0]

    return predicted_utilization
