<template id="add-game">
  <div class="submit-form">
    <h2>Add Game</h2>
    <div v-if="!submitted">

      <div class="form-group">
        <v-text-field
        v-model="game.judul_game"
        label="Judul Game"
        required
        name="judul_game"
        id="judul_game"
      ></v-text-field>
      </div>
    
      <div class="form-group">
        <v-text-field
        v-model="game.genre"
        label="genre"
        required
        name="genre"
        id="genre"
      ></v-text-field>
      </div>

      <div class="form-group">
        <v-text-field
        v-model="game.publisher"
        label="publisher"
        required
        name="publisher"
        id="publisher"
      ></v-text-field>
      </div>

      <div class="form-group">
        <v-text-field
        v-model="game.platform"
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
          v-model="game.release_date"
          label="Release Date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        ref="picker"
        v-model="game.release_date"
        max="2030-01-01"
        min="1950-01-01"
        @change="saveDate"
      ></v-date-picker>
      </v-menu>

      <div class="form-group">
        <v-text-field
        v-model="game.price"
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
            v-model="game.description"
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
            v-model="game.system_requirement"
            label=""
            id="system_requirement">
          </v-textarea>
      </div>

      <button @click="saveGame" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newGame">Add</button>
    </div>
  </div>
</template>

<script>

import http from "@/http";
import "bootstrap/dist/css/bootstrap.css";

export default {
  template: '#add-game',
  name: "add-game",
  data() {
    return {
      game: {
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
      submitted: false,
    };
  },
  methods: {
    saveGame() {
      var data = {
        judul_game: this.game.judul_game,
        genre: this.game.genre,
        publisher: this.game.publisher,
        platform: this.game.platform,
        release_date: this.game.release_date,
        price: Number(this.game.price),
        description: this.game.description,
        system_requirement : this.game.system_requirement
      };

      http.post('http://localhost:8000/api/game', data)
        .then(response => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newGame() {
      this.submitted = false;
      this.game = {};
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
};
</script>

<style>
.submit-form {
  max-width: 400px;
  margin: auto;
  margin-top: 100px;
}
</style>