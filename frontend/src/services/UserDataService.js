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
        return http.get(`/api/user/auth`, { headers: authHeader() })
    }
}

export default new UserDataService();