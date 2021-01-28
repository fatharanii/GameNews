<template id="add-game">
  <div v-if="adminAuth">
    <v-form ref="form">
     <v-container>
       <v-card
            width="800px"
            class="mx-auto my-12">
            <v-card-title width="590" style="background:#757575;color:white" class="white--text mt-10">ADD GAME</v-card-title>
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
              <v-dialog 
                v-model="dialog"
                persistent
                max-width="400"
                :retain-focus="false"
              >
              <template v-slot:activator="{ on, attrs }" :loading="loading">
                <v-btn
                  class="float-right mb-4"
                  elevation="6"
                  color="error"
                  width="140px"
                  v-bind="attrs" 
                  v-on ="on"
                  @click="saveGame"
                >Add
                </v-btn>
              </template>
                <v-card>
                  <v-card-title class="text-h8">
                    Game Added Successfully
                  </v-card-title>
                    <v-card-text></v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                          <v-btn
                            class="float-right"
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
                class="float-right mx-3 mb-4"
                elevation="6"
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
  </v-form>
   <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>

  <div v-else>
      <h4>Admin Content</h4>
</div>
</template>
<script>
import GameDataService from "../../../services/GameDataService";
import UserDataService from '../../../services/UserDataService';
export default {
  template: '#add-game',
  name: "add-game",
  data() {
    return {
      loading : false,
      dialog : false,
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
       this.loading = true
      GameDataService.create(data)
        .then(response => {
          console.log(response.data);
          this.submitted = true;
          this.loading = false
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newGame() {
      this.loading=true;
      this.submitted = false;
      this.game = {};
      this.loading=false;
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

<style scoped>
.container{
  margin-top:50px
}
</style>
