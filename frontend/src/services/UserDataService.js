import http from "../http";
import authHeader from '../services/auth-header';

class UserDataService {
    signIn(data) {
        return http.post(`/api/users/signin`, data)
    }

    userAuthentication() {
        return http.get(`/api/user/auth`, { headers: authHeader() })
    }

    signUp(data) {
        return http.post(`/api/users/signup`, data)
    }

    adminAuthentication() {
        return http.get(`/api/admin/auth`, { headers: authHeader() })
    }

    getAll() {
        return http.get(`/api/users`)
    }

    getById(id_user) {
        return http.get(`/api/users/${id_user}`)
    }

    update(id_user, data) {
        return http.put(`/api/users/${id_user}`, data, { headers: authHeader() })
    }

    delete(id_user) {
        return http.delete(`api/users/${id_user}`, { headers: authHeader() })
    }

    search(username) {
        return http.get(`/api/users/search/${username}`)
    }

    getUserId(){
        return http.get('/api/user-id/auth', { headers: authHeader() })
    }
}

export default new UserDataService();