


import numpy as np
import pandas as pd
from sklearn import preprocessing


# In[51]:


Data_Frame=pd.read_csv("USA_Housing.csv")
Data_Frame.head()


# In[52]:


del Data_Frame["Area Population"]
del Data_Frame["Address"]
Data_Frame.head()


# In[53]:


Y=Data_Frame["Price"]
del Data_Frame["Price"]
del Data_Frame["Avg. Area House Age"]


# In[54]:


X=Data_Frame
X.head()


# In[55]:


Y.head()


# In[56]:


from sklearn.model_selection import train_test_split
x_train,x_test,y_train,y_test = train_test_split(X,Y,random_state = 0)


# In[58]:


from sklearn.linear_model import LinearRegression
clf=LinearRegression()
clf.fit(x_train,y_train)


# In[62]:


predict=clf.predict(x_test)


# In[63]:


predict


# In[66]:


import pickle 


# In[67]:


# Saving model to disk
pickle.dump(clf, open('Housing_Model.pkl','wb'))






