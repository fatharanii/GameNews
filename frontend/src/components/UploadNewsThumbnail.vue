<template>
<div id="app">
  <v-app>
    <v-content>
      <v-container>
        <v-file-input label="Select Image File..." 
          accept="image/*" @change="onFileChanged"></v-file-input>
        <!--button @click="onUpload">Upload!</button-->
        <v-btn color="primary" @click="onUpload">Upload</v-btn>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>

<script>
//import http from '../http';
import http from "@/http";
//import NewsDataService from "../services/NewsDataService";
export default {
  data: () => ({
    selectedFile: null
  }),
  methods: {
    onFileChanged (event) {
        this.selectedFile = event.target.files[0]
    },
    onUpload() {
        // upload file
        const formData = new FormData()
        formData.append('myFile', this.selectedFile, this.selectedFile.name)
        http.put('http://localhost:8000/api/news-thumbnail/'+this.$route.params.id_berita, formData)
    }
  }
}
</script>