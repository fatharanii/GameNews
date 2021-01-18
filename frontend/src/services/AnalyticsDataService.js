import http from "../http";
import authHeader from '../services/auth-header';

class AnalyticsDataService{
    getAccessToken(){
        return http.get("/accessTokens", {headers: authHeader()})
    }
}

export default new AnalyticsDataService();