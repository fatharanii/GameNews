import http from "../http";
import authHeader from '../services/auth-header';


class BookmarkDataService {
  getAllReadLater() {
    return http.get("/api/read_later", { headers: authHeader() });
  }
  add(data) {
    return http.post(`/api/read_later`, data, { headers: authHeader() });
  }

  delete(id_read_later) {
    return http.delete(`/api/read_later/${id_read_later}`, { headers: authHeader() });
  }

  getUserBookmark(id_user) {
    return http.get(`/api/read_later/my_bookmark/${id_user}`, { headers: authHeader() });
  }

  getBookmarkByUserAndNews(id_user, id_berita){
    return http.get(`/api/read_later/my_bookmark/${id_user}/${id_berita}`, { headers: authHeader() });
  }
}

export default new BookmarkDataService();