import http from "../http";

class UploadFilesService {
    upload(file, id_berita, onUploadProgress) {
      let formData = new FormData();
  
      formData.append("file", file);
  
      return http.post(`/news-thumbnail/${id_berita}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress,
      });
    }
  
    getFiles(id_berita) {
      return http.get(`/show-thumbnail/${id_berita}`);
    }
    /*upload(file, onUploadProgress) {
        let formData = new FormData();
    
        formData.append("file", file);
    
        return http.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress
        });
      }
    
      getFiles() {
        return http.get("/files");
      }*/
  }
  
  export default new UploadFilesService();