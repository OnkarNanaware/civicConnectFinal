import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score

# Load numerical data into a DataFrame
data = pd.read_csv('dataset_electricity.csv')


def predictPower(people_in_ward, season, construction):
    # Select only specific columns as features
    selected_features = ['People in Ward', 'Festive Season', 'Construction']  # List of column names you want to include
    X = data[selected_features]

    # Select the target variable
    y = data['Electricity Usage']

    # Initialize and train Random Forest model using 100% of the data
    rf_regressor = RandomForestRegressor(n_estimators=100, random_state=42)
    rf_regressor.fit(X, y)

    # Make predictions using user input
    input_data = pd.DataFrame({
        'People in Ward': [people_in_ward],
        'Festive Season': [season],
        'Construction': [construction]
    })

    # Encode categorical variables
    input_data['Festive Season'] = input_data['Festive Season'].map({'Yes': 1, 'No': 0, 1: 1, 0: 0})
    input_data['Construction'] = input_data['Construction'].map({True: 1, False: 0, 'True': 1, 'False': 0, 1: 1, 0: 0})

    print("Total People: ", input_data['People in Ward'].values[0])
    print("Season: ", input_data['Festive Season'].values[0])
    print("Construction: ", input_data['Construction'].values[0])

    # Predict water utilization
    predicted_utilization = rf_regressor.predict(input_data)[0]

    return predicted_utilization