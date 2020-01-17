#!/usr/bin/env python
# coding: utf-8

# In[1]:


import numpy as np
import pandas as pd


# In[3]:


Data_Frame=pd.read_csv("KC_Housing.csv")


# In[4]:


Data_Frame


# In[6]:


DF=Data_Frame[["bedrooms","bathrooms","sqft_living"]]


# In[11]:


print(DF.head())
X=DF


# In[12]:


Y=Data_Frame["price"]
Y


# In[14]:


from sklearn.model_selection import train_test_split
x_train,x_test,y_train,y_test = train_test_split(X,Y,random_state = 0)


# In[15]:


from sklearn.linear_model import LinearRegression
clf2=LinearRegression()
clf2.fit(x_train,y_train)


# In[16]:


pre=clf2.predict(x_test)
print(pre)


# In[17]:


import pickle


# In[19]:


# Saving model to disk
pickle.dump(clf2, open('Housing_Model2.pkl','wb'))





