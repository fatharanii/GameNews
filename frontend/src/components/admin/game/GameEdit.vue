<template id="game-details">
  <div v-if="adminAuth">
  <v-form ref="form" v-model="valid">
    <div v-if="currentGame">
    <v-container>
      <v-card
        width="800px"
        :loading="loading"
        class="mx-auto my-12"
      >
      <v-card-title width="590" style="background:#EF5350;color:white" class="white--text mt-10">UPDATE GAME</v-card-title>
          <v-row  justify="center">
            <v-col cols="12" md="10">
              <div class="text-h6">Game Tittle</div>
              <v-text-field
                v-model="currentGame.judul_game"
                placeholder="Game Tittle"
                :rule="idgameRules"
                required
                name="judul_game"
                id="judul_game"
            ></v-text-field>

             <div class="text-h6"> Genre</div>
                <v-select                  
                  v-model="currentGame.genre"
                  :rules="GenreRules"
                  :items="listGenre"
                  placeholder="Genre"
                  required
                  name="genre"
                  id="genre"
                >
                </v-select>

                <div class="text-h6">Publisher</div>
                <v-text-field
                  v-model="currentGame.publisher"
                  placeholder="publisher"
                  required
                  name="publisher"
                  id="publisher"
              ></v-text-field>

              <div class="text-h6">Platform</div>
                <v-select
                  v-model="currentGame.platform"
                  placeholder="Platform"
                  :items="listPlatform"
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

              <div class="text-h6">Price</div>
              <v-text-field
                v-model="currentGame.price"
                placeholder="price"
                required
                name="price"
                id="price"
              ></v-text-field>

              <div class="text-h6">Description</div>
              <v-textarea
                  outlined
                  name="description"
                  required
                  v-model="currentGame.description"
                  placeholde="Description Game"
                  id="description">
                </v-textarea>

              <div class="text-h6">System Requirement</div>
              <v-textarea
                  outlined
                  name="system_requirement"
                  required
                  v-model="currentGame.system_requirement"
                  label=""
                  id="system_requirement">
                </v-textarea>
                  <v-dialog 
                    v-model="dialog"
                    persistent
                    max-width="400"
                    :retain-focus="false"
                    >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="float-right mt-2"
                        elevation="6"
                        color="error"
                        width="140px"
                        v-bind="attrs" 
                        v-on ="on"
                        @click="updateGame"
                      >Update
                      </v-btn>
                    </template>
                    <v-card
                      width="400px">
                      <v-card-tittle class="text-h8">
                        The News Was Updated Successfully
                      </v-card-tittle>
                        <v-card-text></v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="warning"
                            dark
                            :to="'/cmsGame'"
                          >
                          Back to Dashboard
                          </v-btn>
                        </v-card-actions> 
                    </v-card>
                    </v-dialog>
                     <v-btn
                        class="float-right mt-2 mx-3"
                        color="warning"
                        width="140px"
                        dark
                        :to="'/cmsGame'"
                    >Cancel
                     </v-btn>
            </v-col>
          </v-row>
      </v-card>
    </v-container>
    </div>
    <div v-else>
      <br />
      <p>Please click on a News...</p>
      ID BERITA {{ $route.params.id_berita}}
  </div>
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
      adminAuth: false,
      listGenre: ['Action','Survival','Strategy','Adventure','Sport'],
      listPlatform: ['Game Jolt','GamersGate','GOG','Humble Bundle','Itch.io','Steam','PS5', 'PS4', 'PC', 'XboxOne', 'Switch', 'Nintendo'],
    };
  },
  methods: {
    getGame() {
      GameDataService.getById(this.$route.params.id_game)
        .then(response => {
          var tanggal = new Date(response.data[0].release_date);
          console.log(tanggal)
          this.currentGame.id_game = response.data[0].id_game;
          this.currentGame.judul_game = response.data[0].judul_game;
          this.currentGame.genre = response.data[0].genre;
          this.currentGame.publisher = response.data[0].publisher;
          this.currentGame.platform = response.data[0].platform;
          this.currentGame.release_date = (tanggal.getFullYear() + '-' + (tanggal.getMonth() +1) + '-' + tanggal.getDate());
          console.log(this.currentGame.release_date);
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
      GameDataService.update(this.$route.params.id_game, this.currentGame)
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
  mounted() {
    this.getGame();
    this.authenticateAdmin();
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>