import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tech-2021-todo-list-default-rtdb.firebaseio.com',
})

export default api
