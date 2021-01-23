<template>
<v-app light>
  <h1>NEWS</h1>
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
                               <v-progress-linear
                                  v-if="loading"
                                  color="error"
                                  indeterminate
                                ></v-progress-linear>
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
                                            <!-- <v-btn 
                                            icon>
                                              <v-icon>mdi-bookmark</v-icon>
                                            </v-btn> -->
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
                                      <span>{{new Date(news.publish_date).toLocaleString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        })}}
                                      </span>
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
        elevation="2"
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
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64" color="#E52B38"></v-progress-circular>
    </v-overlay>
</v-app>
</template>

<script>
import NewsDataService from "../../../services/NewsDataService";
import GameDataService from "../../../services/GameDataService";
import BASE_URL from "../../../base-url"
export default {
  data(){
    return{
      drawer : false,
      loading :false,
      articles :[],
      error:[],
      page: 1,
      perPage: 4,
      kategori:["All","Action", "Survival","Strategy", "Adventure","Sport"],
      urutkan:["All","Terbaru"],
      searchString: '',
      baseURL: BASE_URL,
      id_user:''
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
      this.loading = true
      NewsDataService.getAll()
      .then(response =>{
        this.articles = response.data;
        console.log('data')
        console.log(response.data)
        console.log(this.articles[0])
        this.loading = false
      })
      .catch(e=>{
        this.errors(e)
      })
    },
    
    selectKategori: function (kategori){
      if(kategori=="All"){
        this.retrieve();
      }else{
        this.loading = true
        NewsDataService.getByKategori(kategori)
        .then(response =>{
          this.articles = response.data;
          console.log('data')
          console.log(response.data)
          this.loading = false
        })
        .catch(e=>{
          this.errors(e)
        })
      } 
    },
    searchNews () {
      this.loading = true
      NewsDataService.search(this.searchString)
      .then(response =>{
        this.articles = response.data;
        console.log('data')
        console.log(response.data)
        this.loading = false
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
    }
  },
  mounted(){
    this.retrieve();
  },
}

</script>
<style scoped src="@/assets/styles/style.css"></style>