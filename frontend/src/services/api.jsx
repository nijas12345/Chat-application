import axiosInstance from "../utils/axios";

export const register = async (formData) => {
  try {
    const response = await axiosInstance.post("/register", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (formData) => {
  try {
    const response = await axiosInstance.post("/login", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const me = async () =>{
  try {
    const response = await axiosInstance.get('/me');
    return response
  } catch (error) {
    throw error
  }
}

export const conversationApiSlice = async() => {
   try {
    const response = await axiosInstance.get('/conversations')
    return response.data
   } catch (error) {
    throw error;
   }
}

export const messageApiSlice = async(conversationId,page,limit) =>{
  try {
    const response = await axiosInstance.get(`/messages/${conversationId}?page=${page}&limit=${limit}`)
    return response
  } catch (error) {
    throw error;
  }
};

export const fetchConversationByUser = async(userId) =>{
  try {
    const response = await axiosInstance.get(`/conversations/user/${userId}`)
    return response.data
  } catch (error) {
    
  }
}

export const fetchConversationByConv = async(conversationId) =>{
  try {
  const response = await axiosInstance.get(`/conversations/conv/${conversationId}`);
  return response.data
  } catch (error) {
    throw error;
  }
};


export const userSlice = async() =>{
  try {
  const response = await axiosInstance.get(`/users`);
  return response.data
  } catch (error) {
    throw error;
  }
}




