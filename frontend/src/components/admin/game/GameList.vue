<template>
<div v-if="adminAuth">
  <div id="brand">
  <div class="news-list">
    <v-container>
    <v-row justify="space-around">
      <v-col>
        <router-view />
          <v-btn
            color="error"
            elevation="4"
            width="110px"
            class="my-2"
            >
            <RouterLink :to="'/api/game-add/'" class="white--text" >
              Add Game
            </RouterLink>
          </v-btn>
          <v-card>
            <v-card-title width="590" style="background:#757575;color:white" class="white--text">LIST GAME</v-card-title>
          <div class="col-md-12">
            <div class="input-group mb-1">
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
            <v-data-table
              :headers="headers"
              :items="games"
              :items-per-page="5"
              
              class="grey lighten-5"
              fixed-header
            >
             <template v-slot:[`item.release_date`]="{ item }">
               <span>{{new Date(item.release_date).toLocaleString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  })}}
                </span>
             </template>
             <template v-slot:[`item.actions`]="{ item }">
                <v-btn 
                class="ma-2"
                width="190px"  
                color="warning" 
                :to="'/api/game/' + item.id_game"
                >
                Update Data
                </v-btn>
                <br> 
                <v-dialog
                  v-model="dialog"
                  persistent
                  max-width="400"
                  :retain-focus="false"
                >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="ma-2"
                    elevation="6"
                    color="error"
                    width="190px"       
                    v-bind="attrs"
                    v-on="on"
                    @click.prevent="selectedGame(item.id_game)"
                  >
                  Delete
                  </v-btn>
                    </template>
                      <v-card>
                        <v-card-title class="text-h8">
                          Apakah Anda yakin untuk menghapus game ini?
                          </v-card-title>
                          <v-card-text></v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              elevation="6"
                              color="warning"
                              @click="dialog = false"
                            >
                              CANCEL
                            </v-btn>
                            <v-btn
                              elevation="6"
                              color="error"
                              @click="dialog = false"
                              @click.prevent="deleteGame(selectedIdGame)"
                            >
                              DELETE
                            </v-btn>
                          </v-card-actions>
                        </v-card> 
                        </v-dialog>
                        <br>
                        <v-btn
                          class="ma-2"
                          color="warning"
                          dark
                          width="190px"
                          :to="'/api/games-update-thumbnail/' + item.id_game"
                        >
                        Update Thumbnail
                      </v-btn>   
                </template>
                <template v-slot:[`item.thumbnail_game`]="{ item }">
                <img :src="baseURL +'/api/game_allthumbnail/'+item.id_game" style="width: 100%;" />
                </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
          <v-overlay :value="loading">
            <v-progress-circular
              indeterminate
              size="64"
              color="#E52B38"
            ></v-progress-circular>
          </v-overlay>
        </v-container>
      </div>
    </div>
</div>

<div v-else>
      <h4>Admin Content</h4>
</div>
</template>

<script>
import GameDataService from "../../../services/GameDataService";
import UserDataService from '../../../services/UserDataService';
import BASE_URL from "../../../base-url";
export default {
    name:"games",
    data () {
      return {
        games: [],
         headers: [
        { text: "ID Games",align: "center",sortable: true, value: "id_game" },
        { text: "Game Title",align: "center",sortable: false, value: "judul_game" },
        { text: "Thumbnail", align: "center", sortable: false,value: "thumbnail_game"},
        { text: "Genre", align: "center", sortable: false, value: "genre"},
        { text: "Publisher", align: "center", sortable: false, value: "publisher"},
        { text: "Platform",align: "center", sortable: false, value: "platform"},
        { text: "Release Date", align: "center", sortable: false,value: "release_date"},
        { text: "Price", align: "center", sortable: false,value: "price"},
        { text: "Action", align: "center",sortable: false, value: "actions"},
      ],
        key: "",
        id: 0,
        dialog: false,
        loading : false,
        judul_game: "",
        selectedIdGame: null,
        adminAuth: false,
        baseURL: BASE_URL
      }
    },
    methods:{
        retrieve(){
          this.loading = true
          GameDataService.getAll()
            .then((response) =>{
              this.games = response.data;
              this.loading = false
            })
            .catch((e)=>{
              console.log(e);
            });
        },
        searchJudulGame() {
          this.loading=true
          GameDataService.search(this.judul_game)
            .then(response => {
              this.games = response.data;
              this.loading=false
              //console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        },
        deleteGame(id_game) {
          this.loading=true
          GameDataService.delete(id_game)
            .then(response => {
              console.log(response.data);
              this.retrieve();
              this.loading=false
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
              //console.log(response.data);
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
.container{
  margin-top:80px
}
</style>
