<template id="game-details">
  <div v-if="currentGame" class="edit-form">
    <h4>Game</h4>

      <div class="form-group">
        <v-text-field
        v-model="currentGame.judul_game"
        label="Judul Game"
        required
        name="judul_game"
        id="judul_game"
      ></v-text-field>
      </div>
    
      <div class="form-group">
        <v-text-field
        v-model="currentGame.genre"
        label="genre"
        required
        name="genre"
        id="genre"
      ></v-text-field>
      </div>

      <div class="form-group">
        <v-text-field
        v-model="currentGame.publisher"
        label="publisher"
        required
        name="publisher"
        id="publisher"
      ></v-text-field>
      </div>

      <div class="form-group">
        <v-text-field
        v-model="currentGame.platform"
        label="platform"
        required
        name="platform"
        id="platform"
      ></v-text-field>
      </div>

      <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="currentGame.release_date"
          label="Release Date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        ref="picker"
        v-model="currentGame.release_date"
        max="2030-01-01"
        min="1950-01-01"
        @change="saveDate"
      ></v-date-picker>
      </v-menu>

      <div class="form-group">
        <v-text-field
        v-model="currentGame.price"
        label="price"
        required
        name="price"
        id="price"
      ></v-text-field>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <v-textarea
            outlined
            name="description"
            required
            v-model="currentGame.description"
            label=""
            id="description">
          </v-textarea>
      </div>

      <div class="form-group">
        <label for="system_requirement">System Requirement</label>
        <v-textarea
            outlined
            name="system_requirement"
            required
            v-model="currentGame.system_requirement"
            label=""
            id="system_requirement">
          </v-textarea>
      </div>

    <button type="submit" class="badge badge-success"
      @click="updateGame"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Game...</p>
    ID Game {{ $route.params.id_berita}}
  </div>
</template>

<script>

import http from "@/http";
import "bootstrap/dist/css/bootstrap.css";
export default {
  name: "game-details",
  data() {
    return {
      message: '',
      currentGame: {
        id_game : "",
        judul_game: "",
        genre: "",
        publisher: "",
        platform: "",
        release_date: "",
        price: "",
        description: "",
        system_requirement : ""
      },
      date: null,
      menu: false,
    };
  },
  methods: {
    getGame() {
      http.get('http://localhost:8000/api/game/'+ this.$route.params.id_game)
        .then(response => {
          this.currentGame.id_game = response.data[0].id_game;
          this.currentGame.judul_game = response.data[0].judul_game;
          this.currentGame.genre = response.data[0].genre;
          this.currentGame.publisher = response.data[0].publisher;
          this.currentGame.platform = response.data[0].platform;
          this.currentGame.release_date = response.data[0].release_date;
          this.currentGame.price = response.data[0].price;
          this.currentGame.description = response.data[0].description;
          this.currentGame.system_requirement = response.data[0].system_requirement;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateGame() {
      http.put('http://localhost:8000/api/game/'+this.$route.params.id_game, this.currentGame)
        .then(response => {
          console.log(response.data);
          this.message = 'The game was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    saveDate (date) {
      this.$refs.menu.save(date)
    },
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
  mounted() {
    this.getGame();
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>