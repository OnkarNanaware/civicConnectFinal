import google.generativeai as genai
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
from langchain.chains.llm import LLMChain
from langchain.chains.sequential import SimpleSequentialChain
from flask import jsonify
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


def ClassifyComplaint(title1,description1):
    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash");
    prompt_ai_template = PromptTemplate(
        input_variables=['title','description'],
        template="""
        This are the ministries of indian government
    1. Ministry of Agriculture & Farmers Welfare
    2. Ministry of Chemicals and Fertilizers
    3. Ministry of Civil Aviation
    4. Ministry of Coal
    5. Ministry of Commerce and Industry
    6. Ministry of Communications
    7. Ministry of Consumer Affairs, Food and Public Distribution
    8. Ministry of Corporate Affairs
    9. Ministry of Culture
    10.Ministry of Defence
    11.Ministry of Earth Sciences
    12.Ministry of Education
    13.Ministry of Electronics and Information Technology
    14.Ministry of Environment, Forest and Climate Change
    15.Ministry of External Affairs
    16.Ministry of Finance
    17.Ministry of Fisheries, Animal Husbandry & Dairying
    18.Ministry of Food Processing Industries
    19.Ministry of Health and Family Welfare
    20.Ministry of Heavy Industries and Public Enterprises
    21.Ministry of Home Affairs
    22.Ministry of Housing and Urban Affairs
    23.Ministry of Information and Broadcasting
    24.Ministry of Jal Shakti
    25.Ministry of Labour and Employment
    26.Ministry of Law and Justice
    27.Ministry of Micro, Small and Medium Enterprises
    28.Ministry of Mines
    29.Ministry of Minority Affairs
    30.Ministry of New and Renewable Energy
    31.Ministry of Panchayati Raj
    32.Ministry of Parliamentary Affairs
    33.Ministry of Personnel, Public Grievances and Pensions
    34.Ministry of Petroleum and Natural Gas
    35.Ministry of Ports, Shipping, and Waterways
    36.Ministry of Power
    37.Ministry of Railways
    38.Ministry of Road Transport and Highways
    39.Ministry of Rural Development
    40.Ministry of Science and Technology
    41.Ministry of Skill Development and Entrepreneurship
    42.Ministry of Social Justice and Empowerment
    43.Ministry of Statistics and Programme Implementation
    44.Ministry of Steel
    45.Ministry of Textiles
    46.Ministry of Tourism
    47.Ministry of Tribal Affairs
    48.Ministry of Water Resources, River Development and Ganga Rejuvenation
    49.Ministry of Women and Child Development
    50.Ministry of Youth Affairs and Sports

        Given the Complaint
        Complaint :,
        title : {title},
        description:{description}

    Classify the Given Complaint into the ministry of india given above.
    if you think it does not belong to any and belong to any other return only name of ministry 
    and if you dont know the answer just return "None" in string
        """ 
    )
    res2 = prompt_ai_template.format(title=title1,description=description1);

    # Assuming the LLM response contains the ministry name in a specific format
    predicted_ministry =llm.invoke(res2); # Implement this function

    # if predicted_ministry:
    #     response_json = {"ministry": predicted_ministry, "status": "200"}
    # else:
    #     response_json = {"ministry": "None", "status": "404"}

    return { "ministry":predicted_ministry}

