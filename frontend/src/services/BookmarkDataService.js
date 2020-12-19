import http from "../http";
import authHeader from '../services/auth-header';


class BookmarkDataService {
  getAllReadLater() {
    return http.get("/api/read_later");
  }
  add(data) {
    return http.post(`/api/read_later`, data, { headers: authHeader() });
  }

  delete(id_berita) {
    return http.delete(`/api/read_later/${id_berita}`);
  }

  getUserBookmark(id_user) {
    return http.get(`/api/read_later/my_bookmark/${id_user}`);
  }
}

export default new BookmarkDataService();