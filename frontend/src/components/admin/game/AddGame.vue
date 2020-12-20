<template id="add-game">
  <div v-if="adminAuth">
    <v-form ref="form" v-model="valid">
     <v-container>
       <v-card
            width="800px"
            :loading="loading"
            class="mx-auto my-12">
            <v-card-title width="590" style="background:#EF5350;color:white" class="white--text mt-10">ADD GAME</v-card-title>
            <v-row  justify="center">
              <v-col cols="12" md="10">
                  <div class="text-h6"> Game Tittle</div>
                  <v-text-field
                  v-model="game.judul_game"
                  :rules ="judulRules"
                  :counter="100"
                  placeholder="Game Tittle"
                  required
                  name="judul_game"
                  id="judul_game"
                ></v-text-field>

                <div class="text-h6"> Genre</div>
                <v-select                  
                  v-model="game.genre"
                  :rules="GenreRules"
                  :items="listGenre"
                  placeholder="Genre"
                  required
                  name="genre"
                  id="genre"
                >
                </v-select>

                <div class="text-h6"> Publisher</div>
                <v-text-field
                  v-model="game.publisher"
                  placeholder="Publisher"
                  required
                  name="publisher"
                  id="publisher"
              ></v-text-field>
              
              <div class="text-h6">Platform</div>
                <v-select
                v-model="game.platform"
                :items="listPlatform"
                placeholder="Platform"
                required
                name="platform"
                id="platform"
              ></v-select>

              <div class="text-h6">Release Date</div>
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
                  :rules="ReleaseDateRules"
                  placeholder="Release Date"
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

              <div class="text-h6">Price</div>
                <v-text-field
                v-model="game.price"
                placeholder="Price"
                required
                name="price"
                id="price"
              ></v-text-field>

              <div class="text-h6">Description</div>
                <v-textarea
                    outlined
                    name="description"
                    required
                    v-model="game.description"
                    placeholder="Description Game"
                    id="description">
                </v-textarea>

              <div class="text-h6">System Requirment</div>
              <v-textarea
                  outlined
                  name="system_requirement"
                  required
                  v-model="game.system_requirement"
                  placeholder="System Requirment"
                  id="system_requirement">
                </v-textarea>
              <v-btn
                class="float-right mt-2"
                elevation="6"
                color="error"
                width="140px"
                large
                @click="saveGame"
              >Add
              </v-btn>
              <v-btn
                class="float-right mt-2 mx-3"
                elevation="6"
                color="warning"
                width="140px"
                large
                dark
                :to="'/cmsGame'"
              >Cancel
              </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-form>
  </div>

  <div v-else>
      <h4>Admin Content</h4>
</div>
</template>

<script>

// import http from "@/http";
import "bootstrap/dist/css/bootstrap.css";
// import authHeader from '../../../services/auth-header';
import GameDataService from "../../../services/GameDataService";
import UserDataService from '../../../services/UserDataService';
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
      adminAuth: false,
       listGenre: ['Action','Adventure','Survival','Strategy','Sport'],
      listPlatform: ['Game Jolt','GamersGate','GOG','Humble Bundle','Itch.io','Steam','PS5', 'PS4', 'PC', 'XboxOne', 'Switch', 'Nintendo'],
      judulRules:[
        (v) => !!v || "Judul Tidak Boleh Kosong.",
        (v) => v.length <= 100 || "Judul maksimal 100 karakter",
        (v) => v.length >= 3 || "Judul harus minimal 3 karakter",
      ],
      ReleaseDateRules:[
        (v) => !!v || "Release Date Tidak Boleh Kosong"
      ],
      GenreRules:[
        (v) => !!v || "Genre Tidak boleh "
      ]
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

      GameDataService.create(data)
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
    authenticateAdmin() {
          UserDataService.adminAuthentication()
            .then(response => {
              this.adminAuth = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
  mounted(){
      this.authenticateAdmin();
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