

import google.generativeai as genai
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from langchain.chains import LLMChain
from  langchain.chains import SimpleSequentialChain
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def ClassifyApi():
    
    llm = ChatGoogleGenerativeAI(model="gemini-pro")
    res = llm.invoke("Explain me ABout AI")

    prompt_template_ai = PromptTemplate(
        input_variables=['cuisine'],
        template="Suggest Some {cuisine} hotel names. single name please"
    )

    # prompt_template_ai.format(cuisine="indian")
    name_chain = LLMChain(llm=llm,prompt=prompt_template_ai)

    prompt_template_ai2 = PromptTemplate(
        input_variables=['restaurent_name'],
        template="suggest menu items for {restaurent_name}"
    )
    res_chain = LLMChain(llm=llm,prompt=prompt_template_ai2)

    # prompt_template_ai.format(cuisine="indian")
    # res2 = prompt_template_ai.format(cuisine="indian")
    # res3 = llm.invoke(res2)
    # print(res3)
    # res2 = llm.invoke(prompt_template_ai);
    # print(prompt_template_ai.format(cuisine="indian"))
    # print(res);
    chain =  SimpleSequentialChain(chains=[name_chain,res_chain])
    res = chain.run("Indian")
    print(res)
