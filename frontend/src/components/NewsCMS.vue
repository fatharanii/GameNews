<template id="news-details">
  <div v-if="currentNews" class="edit-form">
    <h4>News</h4>

    <div class="form-group">
        <v-text-field
        v-model="currentNews.id_game"
        label="Id Game"
        required
        name="id_game"
        id="id_game"
      ></v-text-field>
      </div>

      <div class="form-group">
        <v-text-field
        v-model="currentNews.judul_berita"
        label="Judul Berita"
        required
        name="judul_berita"
        id="judul_berita"
      ></v-text-field>
      </div>
    
      <div class="form-group">
        <v-text-field
        v-model="currentNews.kategori"
        label="kategori"
        required
        name="kategori"
        id="kategori"
      ></v-text-field>
      </div>

      <div class="form-group">
        <label for="isi">Isi</label>
        <v-textarea
            outlined
            name="isi"
            required
            v-model="currentNews.isi"
            label=""
            id="isi">
          </v-textarea>
      </div>

    <button type="submit" class="badge badge-success"
      @click="updateNews"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a News...</p>
    ID BERITA {{ $route.params.id_berita}}
  </div>
</template>

<script>

import http from "@/http";
import "bootstrap/dist/css/bootstrap.css";
export default {
  name: "news-details",
  data() {
    return {
      message: '',
      currentNews: {
        id_game: "",
        judul_berita: "",
        kategori: "",
        isi: ""
      },
    };
  },
  methods: {
    getNews() {
      http.get('http://localhost:8000/api/news/'+this.$route.params.id_berita)
        .then(response => {
          this.currentNews.id_game = response.data[0].id_game;
          this.currentNews.judul_berita = response.data[0].judul_berita;
          this.currentNews.kategori = response.data[0].kategori;
          this.currentNews.isi = response.data[0].isi;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateNews() {

      http.put('http://localhost:8000/api/news/'+this.$route.params.id_berita, this.currentNews)
        .then(response => {
          console.log(response.data);
          this.message = 'The news was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getNews();
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>