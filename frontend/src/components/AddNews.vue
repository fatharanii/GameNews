<template id="add-news">
  <div class="submit-form">
    <h2>Add News</h2>
    <div v-if="!submitted">

      <div class="form-group">
        <v-text-field
        v-model="news.id_game"
        label="Id Game"
        required
        name="id_game"
        id="id_game"
      ></v-text-field>
      </div>

      <div class="form-group">
        <v-text-field
        v-model="news.judul_berita"
        label="Judul Berita"
        required
        name="judul_berita"
        id="judul_berita"
      ></v-text-field>
      </div>
    
      <div class="form-group">
        <v-text-field
        v-model="news.kategori"
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
            v-model="news.isi"
            label=""
            id="isi">
          </v-textarea>
      </div>

      <button @click="saveNews" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newNews">Add</button>
    </div>
  </div>
</template>

<script>

import NewsDataService from "../services/NewsDataService";

export default {
  template: '#add-news',
  name: "add-news",
  data() {
    return {
      news: {
        id_game: "",
        judul_berita: "",
        kategori: "",
        isi: ""
      },
      submitted: false,
    };
  },
  methods: {
    saveNews() {
      var data = {
        id_game: Number(this.news.id_game),
        judul_berita: this.news.judul_berita,
        kategori: this.news.kategori,
        isi: this.news.isi
      };

      NewsDataService.create(data)
        .then(response => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newNews() {
      this.submitted = false;
      this.news = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 400px;
  margin: auto;
  margin-top: 100px;
}
</style>