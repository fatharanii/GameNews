<template>

<div v-if="userAuth">
<v-app light>
  <h1>BOOKMARK</h1>
  <v-row>
    <v-col
      cols="8"
      class="flex-grow-0 flex-shrink-0"
    >
      <v-content>
            <v-container fluid>
                <v-layout row wrap align-center>
                    <v-flex xs11 offset-md1>
                        <div v-for="news in visiblePages" :key="news.id_berita">
                            <v-card class="my-4 mx-2" hover>
                                <v-card-media>
                                    <v-container fill-height fluid>
                                        <v-layout>
                                            <v-flex xs3 >
                                                <v-img
                                                height="150px"
                                                width="150px"
                                                class="mt-3"
                                                v-bind:src="baseURL + '/api/news_thumbnail/' + news.id_berita"
                                                ></v-img>
                                            </v-flex>
                                            <v-flex xs12 align-end >
                                                    <div
                                                        class="pl-3 mt-3"
                                                    >
                                                        <span class="headline">{{ news.judul_berita }}</span>
                                                        <div class=" subtitle-1 text--primary">
                                                            {{ news.kategori }}
                                                        </div>
                                                        <p class="text-start text--secondary" v-if="!readMoreActivated">{{ news.isi.slice(0, 200) }}
                                                            <readmore v-if="!readMoreActivated">...</readmore>
                                                        </p>
                                                    </div>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-media>
                                <v-divider class="mx-5 my-0"></v-divider>
                                <v-card-actions>
                                    <v-chip small class="grey--text">
                                        {{news.publish_date}}
                                    </v-chip>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="deep-purple lighten-2"
                                      text
                                    >
                                      <readmore v-if="!readMoreActivated">
                                        <RouterLink :to="'/news/'+news.id_berita" class="routerlinkgame">
                                          Read More
                                        </RouterLink>
                                      </readmore>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                        <v-pagination
                              v-model="page"
                              :length="Math.ceil(articles.length/perPage)"
                        ></v-pagination>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-col>
    <v-col
      cols=""
      class="flex-grow-1 flex-shrink-0"
    >
      <v-row>
      <v-flex  sm6 ml-4>
        <v-text-field
          label='Cari berita'
          v-model='searchString'
          clearable
          >
        </v-text-field>
      </v-flex>

      <v-btn
        icon
        color="black"
        @click="retrieve"
        class="mt-6 ml-2"
        x-small
      ></v-btn>
        <v-content>
              <v-container fluid>
                  <v-layout row wrap align-center>
                      <v-flex xs11 offset-md1>
                          <div v-for="news in articles" :key="news.id_berita">
                              <v-card class="my-4 mx-2" hover>
                                  <v-card-media>
                                      <v-container fill-height fluid>
                                          <v-layout>
                                              <v-flex xs3 >
                                                  <v-img
                                                  height="150px"
                                                  width="150px"
                                                  class="mt-3"
                                                  v-bind:src="baseURL + '/api/news_thumbnail/' + news.id_berita"
                                                  ></v-img>
                                              </v-flex>
                                              <v-flex xs12 align-end >
                                                      <div
                                                          class="pl-3 mt-3"
                                                      >
                                                          <span class="headline">{{ news.judul_berita }}</span>
                                                          <div class=" subtitle-1 text--primary">
                                                              {{ news.kategori }}
                                                          </div>
                                                          <p class="text-start text--secondary" v-if="!readMoreActivated">{{ news.isi.slice(0, 200) }}
                                                              <readmore v-if="!readMoreActivated">...</readmore>
                                                          </p>
                                                      </div>
                                              </v-flex>
                                          </v-layout>
                                      </v-container>
                                  </v-card-media>
                                  <v-divider class="mx-5 my-0"></v-divider>
                                  <v-card-actions>
                                      <v-chip small class="grey--text">
                                          {{news.publish_date}}
                                      </v-chip>
                                      <v-spacer></v-spacer>
        <v-btn
          flat
          color="error"
          @click="deleteNewsFromBookmarkbyid"
          class="mt-0 ml-0"
          small
        >
          <span>Delete From Bookmark</span>
        </v-btn>                                      <v-btn
                                        color="deep-purple lighten-2"
                                        text
                                      >
                                        <readmore v-if="!readMoreActivated">
                                          <RouterLink :to="'/news/'+news.id_berita" class="routerlinkgame">
                                            Read More
                                          </RouterLink>
                                        </readmore>
                                      </v-btn>
                                  </v-card-actions>
                              </v-card>
                          </div>
                      </v-flex>
                  </v-layout>
              </v-container>
          </v-content>
       </v-row>
      </v-col>
      <v-col
        cols=""
        class="flex-grow-1 flex-shrink-0"
      >
        <v-row>
        <v-flex  sm6 ml-4>
          <v-text-field
            label='Cari berita'
            v-model='searchString'
            clearable
            >
          </v-text-field>
        </v-flex>
        <v-btn
          icon
          color="black"
          @click="retrieve"
          class="mt-6 ml-2"
          x-small
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn
          flat
          color="error"
          @click="searchNews"
          class="mt-5 ml-2"
          small
        >
          <span>Search</span>
        </v-btn>
        </v-row>
        <div class="game_by">
          <h2>Kategori :</h2>
          <v-card
            class="d-flex align-content-center flex-wrap"
            flat
            tile
          >
            <v-card
              v-for="n in kategori"
              :key="n"
              class="kategori pa-1 mx-1 my-2"
              outlined
              tile
            >
              <button
              v-on:click="selectKategori(n)">
              {{n}}</button>
            </v-card>
          </v-card>
        </div>
        <div class="game_by">
          <h2>Urutkan :</h2>
          <v-card
            class="d-flex align-content-center flex-wrap"
            flat
            tile
          >
            <v-card
              v-for="n in urutkan"
              :key="n"
              class="kategori pa-1 mx-1 my-2"
              outlined
              tile
            >
              <button
              v-on:click="selectUrutkan(n)">
              {{n}}</button>
            </v-card>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-app>
</div>

<div v-else>
      <h6>You must log in first</h6>
      <RouterLink :to="'/login/'">
                  <a class="nav-link" href="#">Login</a>
      </RouterLink>
</div>
</template>


<script>
// import http from "@/http";
// import authHeader from '../../../services/auth-header';
import UserDataService from "../../../services/UserDataService";
import NewsDataService from "../../../services/NewsDataService";
import GameDataService from "../../../services/GameDataService";
import BASE_URL from "../../../base-url"
export default {
  data(){
    return{
      drawer : false,
      articles :[],
      error:[],
      page: 1,
      perPage: 4,
      kategori:["All","Action", "Survival","Strategy", "Adventure","Sport"],
      urutkan:["All","Terbaru"],
      searchString: '',
      userAuth: false,
      baseURL: BASE_URL
    }
  },
  computed: {
    visiblePages () {
      window.scrollTo(0,0);
      return this.articles.slice((this.page - 1)* this.perPage, this.page* this.perPage)
    }
  },
  methods:{
    retrieve() {
      http.get('http://localhost:8000/api/my_bookmark/:id')
      .then(response =>{
        this.articles = response.data;
        console.log('data')
        console.log(response.data)
      })
      .catch(e=>{
        this.errors(e)
      })
      http.get('http://localhost:8000/api/read_later/')
      .then(response =>{
        this.articles = response.data;
        console.log('data')
        console.log(response.data)
      })
      .catch(e=>{
        this.errors(e)
      })
    },
	deleteNewsFromBookmarkbyid(){
      http.get('http://localhost:8000/read_later/:id'+this.$route.params.id_berita)
        .then(response => {
          console.log(response.data);
          this.message = 'The news was removed from bookmark!';
        })
        .catch(e => {
          console.log(e);
        });

	},
    selectKategori: function (kategori){
      if(kategori=="All"){
        this.retrieve();
      }else{
        NewsDataService.getByKategori(kategori)
        .then(response =>{
          this.articles = response.data;
          console.log('data')
          console.log(response.data)
        })
        .catch(e=>{
          this.errors(e)
        })
      } 
    },
    searchNews () {
      NewsDataService.search(this.searchString)
      .then(response =>{
        this.articles = response.data;
        console.log('data')
        console.log(response.data)
      })
      .catch(e=>{
        this.errors(e)
      })
    },
    selectUrutkan: function (urutkan) {
      if(urutkan=="All"){
        this.retrieve();
      }else{
        GameDataService.getASC()
        .then(response =>{
          this.articles = response.data;
          console.log('data')
          console.log(response.data)
        })
        .catch(e=>{
          this.errors(e)
        })
      }
    },
    authenticateUser() {
          UserDataService.userAuthentication()
            .then(response => {
              this.userAuth = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        }
  },
  mounted(){
    this.retrieve();
    this.authenticateUser();
  },
}
</script>
<style scoped src="@/assets/styles/style.css"></style>
