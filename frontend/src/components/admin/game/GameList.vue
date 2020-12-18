<template>
<div v-if="adminAuth">
  <div id="brand">

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
  <div class="game-list">
    <v-row >
      <v-col cols="8" >
      </v-col>
        <v-col cols="4">
          <v-btn
            color="blue darken-1"
            cols="4"
          >
            <RouterLink :to="'/api/game-add/'" class="white--text" >
              Add Game
            </RouterLink>
          </v-btn>
        </v-col>
    </v-row>
    <v-container>
    <v-row>
          <v-col>
            <v-simple-table height="500px" class="grey lighten-5">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Judul</th>
                    <th>Genre</th>
                    <th>Publisher</th>
                    <th>Platform</th>
                    <th>Release Date</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>System Requirement</th>

                    <th class="text-center">Pilihan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="games_item in games" :key="games_item.id_game">
                    <td class="text-xs-center">{{ games_item.id_game }}</td>
                    <td class="text-xs-center">{{ games_item.judul_game }}</td>
                    <td class="text-xs-center">{{ games_item.genre }}</td>
                    <td class="text-xs-center">{{ games_item.publisher }}</td>
                    <td class="text-xs-center">{{ games_item.platform }}</td>
                    <td class="text-xs-center">{{ games_item.release_date }}</td>
                    <td class="text-xs-center">{{ games_item.price }}</td>
                    <td class="text-xs-center">{{ games_item.description }}</td>
                    <td class="text-xs-center">{{ games_item.system_requirement }}</td>
                    <td class="text-center">
                        <v-btn
                          class="ma-2"
                          color="warning"
                          dark
                          width="110px"
                          :to="'/api/game/' + games_item.id_game"
                        >
                        Edit
                      </v-btn>
                      <v-btn
                          class="ma-2"
                          color="warning"
                          dark
                          width="200px"
                          :to="'/api/games-update-thumbnail/' + games_item.id_game"
                        >
                        Update Thumbnail
                      </v-btn>
                        <v-dialog
                          v-model="dialog"
                          persistent
                          max-width="290"
                          :retain-focus="false"
                        >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            class="ma-2"
                            color="error"
                            width="100px"
                            v-bind="attrs"
                            v-on="on"
                            @click.prevent="selectedGame(games_item.id_game)"
                            >
                            Delete
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title class="text-h8">
                            Apakah Anda yakin untuk menghapus game ini? (ID = :{{selectedIdGame}})
                          </v-card-title>
                          <v-card-text></v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="grey darken-1"
                              text
                              @click="dialog = false"
                            >
                              Batal
                            </v-btn>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="dialog = false"
                              @click.prevent="deleteGame(selectedIdGame)"
                            >
                              Yakin
                            </v-btn>
                          </v-card-actions>
                        </v-card> 
                        </v-dialog>
                      </td>
                    </tr> 
                  </tbody>
              </template>
            </v-simple-table>
          </v-col>
    </v-row>
    </v-container>
  </div>
  <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by Judul Game"
          v-model="judul_game"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchJudulGame"
            :to="'/api/game?judul_game=' + judul_game"
          >
            Search
          </button>
        </div>
      </div>
    </div>
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
//import NewsDataService from "../services/NewsDataService";
export default {
    name:"games",
    data () {
      return {
        games: [],
        key: "",
        id: 0,
        dialog: false,
        isLoading: false,
        judul_game: "",
        selectedIdGame: null,
        adminAuth: false
      }
    },
    methods:{
        retrieve(){
          GameDataService.getAll()
            .then((response) =>{
              this.games = response.data;
            })
            .catch((e)=>{
              console.log(e);
            });
        },
        searchJudulGame() {
          GameDataService.search(this.judul_game)
            .then(response => {
              this.games = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        },
        deleteGame(id_game) {
          GameDataService.delete(id_game)
            .then(response => {
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        },
        selectedGame(id_game) {
          this.selectedIdGame = id_game
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
    mounted(){
      this.retrieve();
      this.authenticateAdmin();
    },
};
</script>

<style scoped>
.progressbar {
  position: relative;
  bottom: 50%;
  left: 50%;
}
</style>