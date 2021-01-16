<template>
  <div v-if="userAuth">
    <v-app light>
      <h1>BOOKMARK</h1>
      <v-row>
        <v-col
          cols="8"
          class="flex-grow-0 flex-shrink-0"
        >
          <v-main>
                <v-container style="margin-top:0px">
                    <v-layout row wrap align-center>
                        <v-flex xs11 offset-md1>
                            <div v-for="news in visiblePages" :key="news.id_berita">
                                <v-card class="my-4 mx-2" hover>
                                    <v-img
                                    height="250px"
                                    v-bind:src="baseURL + '/api/news_thumbnail/' + news.id_berita"
                                    ></v-img>
                                    <v-card-media>
                                        <v-container style="margin-top:0px">
                                            <v-layout>
                                                <v-flex xs12 align-end d-flex>
                                                    <span class="headline">{{ news.judul_berita }}</span>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-card-media>
                                    <div class="mx-4 my-1 subtitle-1 text--primary">
                                      {{ news.kategori }}
                                    </div>
                                    <div class="text-start mx-4 text--secondary" v-if="!readMoreActivated" v-html="news.isi.slice(0, 300)">
                                    </div>
                                    <readmore  class="mx-4"  v-if="!readMoreActivated">...</readmore>
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
            </v-main>
        </v-col>
      </v-row>
    </v-app>
  </div>

  <div v-else class="bookmarklogin">
    <h2>You must log in first</h2>
    <v-btn
        elevation="2"
        color="error"
        class="mt-5 ml-2"
        small
      >
        <RouterLink :to="'/login/'" class="routerlinklogin">
          <span>Login</span>
        </RouterLink>
      </v-btn>
    
  </div>
</template>


<script>

import UserDataService from "../../../services/UserDataService";
import NewsDataService from "../../../services/NewsDataService";
import BookmarkDataService from "../../../services/BookmarkDataService";
import BASE_URL from "../../../base-url"
export default {
  data(){
    return{
      drawer : false,
      articles :[],
      read_later : [],
      error:[],
      page: 1,
      perPage: 4,
      kategori:["All","Action", "Survival","Strategy", "Adventure","Sport"],
      urutkan:["All","Terbaru"],
      searchString: '',
      userAuth: false,
      baseURL: BASE_URL,
      id_user: 0
    }
  },
  computed: {
    visiblePages () {
      window.scrollTo(0,0);
      return this.articles.slice((this.page - 1)* this.perPage, this.page* this.perPage)
    }
  },
  methods:{
    async retrieve() {
      await UserDataService.getUserId()
      .then(response =>{
        this.id_user = response.data;
        if(response.data == ''){this.id_user = 0}

      })
      .catch(e=>{
        console.log(e)
      })
      BookmarkDataService.getUserBookmark(this.id_user)
      .then(response =>{
        // this.articles = response.data;
        this.read_later = response.data;
        var i;
        for(i = 0; i < this.read_later.length; i++){
          NewsDataService.get(this.read_later[i].id_berita)
          .then(response => {
            this.articles.push(response.data[0]);
          })
          .catch(e => {
            console.log(e)
          })
        }
      })
      .catch(e=>{
        console.log(e)
      })
    },

    authenticateUser() {
          UserDataService.userAuthentication()
            .then(response => {
              this.userAuth = response.data;
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