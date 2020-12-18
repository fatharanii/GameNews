<template>
<div v-if="adminAuth">
  <div id="brand">
  <div class="news-list">
    <v-container>
    <v-row justify="space-around">
      <v-col>
        <router-view />
          <v-btn
            color="grey darken-1"
             width="110px"
            >
            <RouterLink :to="'/api/news-add/'" class="white--text" >
              Add News
            </RouterLink>
          </v-btn>
          <v-card>
          <div class="col-md-12">
            <div class="input-group mb-1">
              <input type="text" class="form-control" placeholder="Search by Judul Berita"
                v-model="judul_berita"/>
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button"
                  @click="searchJudulBerita"
                  :to="'/api/news?judul_berita=' + judul_berita"
                >
                Search
              </button>
              </div>
            </div>
          </div>
            <v-data-table
              :headers="headers"
              :items="news"
              :items-per-page="5"
              class="grey lighten-5"
              fixed-header
            >
             <template v-slot:[`item.actions`]="{ item }">
                <v-btn 
                class="ma-2"
                width="190px"  
                color="warning" 
                :to="'/api/news/' + item.id_berita"
                :loading="item.createloading" 
                :disabled="createloading">
                Update Data
                </v-btn>
                <br> 
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
                    width="190px"       
                    v-bind="attrs"
                    v-on="on"
                    @click.prevent="selectedNews(item.id_berita)"
                  >
                  Delete
                  </v-btn>
                    </template>
                      <v-card>
                        <v-card-title class="text-h8">
                          Apakah Anda yakin untuk menghapus berita ini? (ID = :{{selectedIdBerita}})
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
                              @click.prevent="deleteNews(selectedIdBerita)"
                            >
                              Yakin
                            </v-btn>
                          </v-card-actions>
                        </v-card> 
                        </v-dialog>
                        <br>
                        <v-btn
                          class="ma-2"
                          color="warning"
                          dark
                          :to="'/api/news-update-thumbnail/' + item.id_berita"
                        >
                        Update Thumbnail
                      </v-btn>   
                </template>
                <template v-slot:[`item.thumbnail`]="{ item }">
                <img :src="'http://localhost:8000/api/news_thumbnail/' + item.id_berita" style="width: 80%;" />
                </template>
                </v-data-table>
          </v-card>
          </v-col>
    </v-row>
    </v-container>
  </div>
</div>

<div v-else>
      <h4>Admin Content</h4>
</div>
</template>

<script>
import http from "@/http";
import "bootstrap/dist/css/bootstrap.css";
import authHeader from '../services/auth-header';
//import NewsDataService from "../services/NewsDataService";
export default {
    name:"news",
    data () {
      return {
        news: [],
        headers: [
        { text: "ID News", align: "center", sortable: true, value: "id_berita" },
        { text: "ID Games",align: "center",sortable: false, value: "id_game" },
        { text: "News Title",align: "center",sortable: false, value: "judul_berita" },
        { text: "Category", align: "center", sortable: false, value: "kategori"},
        { text: "Thumbnail", align: "center", sortable: false, value: "thumbnail"},
        { text: "Date Publish",align: "center", sortable: false, value: "publish_date"},
        { text: "Date Update", align: "center", sortable: false,value: "lastupdate_date"},
        { text: "Action", align: "center",sortable: false, value: "actions"},
      ],
        key: "",
        id: 0,
        dialog: false,
        isLoading: false,
        judul_berita: "",
        selectedIdBerita: null,
        adminAuth: false
      }
    },
    methods:{
        retrieve(){
          http
          .get('http://localhost:8000/api/news')
            .then((response) =>{
              this.news = response.data;
            })
            .catch((e)=>{
              console.log(e);
            });
        },
        searchJudulBerita() {
          http.get('http://localhost:8000/api/news/search/'+this.judul_berita)
            .then(response => {
              this.news = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        },
        deleteNews(id_berita) {
          http.delete('http://localhost:8000/api/news/'+id_berita, { headers: authHeader() })
            .then(response => {
              console.log(response.data);
              this.retrieve();
            })
            .catch(e => {
              console.log(e);
            });
        },
        selectedNews(id_berita) {
          this.selectedIdBerita = id_berita
        },
        authenticateAdmin() {
          http.get('http://localhost:8000/api/admin/auth', { headers: authHeader() })
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

.col-md-6{
  position: relative;
  left :51%
}
</style>