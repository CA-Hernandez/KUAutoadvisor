#!/usr/bin/env python
# coding: utf-8

# In[21]:


import json


# In[ ]:





# In[22]:


fileOut = "USE autoadvisor;\nCREATE TABLE import_table(course VARCHAR(100), coursename VARCHAR(100), attempted VARCHAR(100), received VARCHAR(100), grade VARCHAR(100));\nINSERT INTO import_table(course, coursename, attempted, received, grade)  \nVALUES "
with open("Trasncript.json", "r") as file:
    database = json.load(file)


# In[23]:


transcript = database[0]


# In[24]:


for final in transcript['final']:
    fileOut = fileOut + "\n(\"" + (final['course']) + "\", \""
    fileOut = fileOut + (final['coursename']) + "\", \""
    fileOut = fileOut + (final['attempted']) + "\", \""
    fileOut = fileOut + (final['received']) + "\", \""
    fileOut = fileOut + (final['grade']) + "\"), "
")"


# In[25]:


fileOut = fileOut[:len(fileOut) - 2] + ";"


# In[26]:


with open('import.sql', 'w') as sqlfile:
    sqlfile.write(fileOut);


# In[ ]:




