<template>
<v-app light>
  <h1>GAMES</h1>
  <v-row>
    <v-col
      cols="8"
      class="flex-grow-0 flex-shrink-0"
    >
      <div class="listGame">
        <v-layout row wrap class="pa-4">
          <v-flex
            v-for="(game, i) in visiblePages"
            :key="i"
          >
            <v-card
              class="mx-1 my-2"
              max-width="350"
              hover
            >
              <v-img
                height="150"
                v-bind:src="baseURL + '/api/game_allthumbnail/' + game.id_game"
              ></v-img>
              <v-card-title>
                <RouterLink :to="'/game/'+game.id_game" class="routerlinkheadline">
                  {{ game.judul_game }}
                </RouterLink>
              </v-card-title>
              <v-card-text>
                <v-row
                  align="center"
                  class="mx-0"
                >
                  <div class="grey--text">
                    {{ game.publisher }}
                  </div>
                </v-row>
                <div class="my-1 subtitle-1">
                  {{ game.price }} • {{ game.genre }} • {{ game.platform }}
                </div>
                  <p class="text-start" v-if="!readMoreActivated">{{ game.description.slice(0, 170) }}
                    <readmore v-if="!readMoreActivated">...</readmore>
                  </p>
              </v-card-text>
              
              <v-divider class="mx-5 my-0"></v-divider>
              <v-card-actions>
                <v-btn
                  color="deep-purple lighten-2"
                  text
                >
                  <readmore v-if="!readMoreActivated">
                    <RouterLink :to="'/game/'+game.id_game" class="routerlinkgame">
                      Read More
                    </RouterLink>
                  </readmore>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
      <v-pagination
        v-model="page"
        :length="Math.ceil(articles.length/perPage)"
        @input="handlePageChange"
      ></v-pagination>
    </v-col>
    <v-col
      cols=""
      class="flex-grow-1 flex-shrink-0"
    >
      <v-row>
      <v-flex  sm6 ml-4>
        <v-text-field
          label='Game name'
          v-model='searchString'
          clearable
          >
        </v-text-field>
      </v-flex>
      <v-btn
        icon
        color="black"
        v-on:click="selectPlatform('All')"
        class="mt-6 ml-2"
        x-small
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn
        elevation="2"
        color="error"
        @click="searchGame"
        class="mt-5 ml-2"
        small
      >
        <span>Search</span>
      </v-btn>
      </v-row>
      <div class="game_by">
        <h2>Genre :</h2>
        <v-card
          class="d-flex align-content-center flex-wrap"
          flat
          tile
        >
          <v-btn
            v-for="n in genre"
            :key="n"
            class="pa-1 mx-1 my-2"
            elevation="2"
            rounded
            small
            color="grey lighten-2"
            v-on:click="selectGenre(n)"
          >
						{{n}}
          </v-btn>
        </v-card>
      </div>
      <div class="game_by">
        <h2>Platform :</h2>
        <v-card
          class="d-flex align-content-center flex-wrap"
          flat
          tile
        >
          <v-btn
            v-for="n in platform"
            :key="n"
            class="pa-1 mx-1 my-2"
            elevation="2"
            rounded
            small
            color="grey lighten-2"
            v-on:click="selectPlatform(n)"
          >
						{{n}}
          </v-btn>
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
import BASE_URL from "../../../base-url";
import GameDataService from "../../../services/GameDataService";
export default {
  data(){
    return{
      drawer : false,
      loading : false,
      articles :[],
      articlesPerPage:[],
      error:[],
      page: 1,
      perPage: 6,
      genre:["All","Action", "Survival","Strategy", "Adventure","Sport"],
      platform:["All","Steam", "Itch.io","GOG", "GamersGate","Humble Bundle", "Game Jolt","PS5", "PS4", "PC", "XboxOne", "Switch", "Nintendo"],
      genreSelected: '',
      platformSelected: '',
      searchString: '',
      searchStringLast: '',
      filterBy : '',
      baseURL: BASE_URL
    }
  },
  computed: {
    visiblePages () {
      window.scrollTo(0,0);
      return this.articlesPerPage
    }
  },
  methods:{
    getRequestParams(page, perPage){
      let params = {};
      if(page){
        params["page"]=page;
      }
      if(perPage){
        params["limit"]=perPage;
      }
      return params;
    },
    retrievePagination() {
      this.loading = true
      const params = this.getRequestParams(this.page, this.perPage);
      GameDataService.getPagination(params)
      .then(response =>{
        this.articlesPerPage = response.data;
        console.log('data')
        console.log(response.data)
        this.loading = false
      })
      .catch(e=>{
        this.errors(e)
      })
    },
    handlePageChange(value) {
      this.page = value;
      if(this.filterBy=='Genre'){
        this.selectGenre(this.genreSelected);
      }else if(this.filterBy=='Platform'){
        this.selectPlatform(this.platformSelected);
      }else if(this.filterBy=='Search'){
        this.searchGame()
      }else{
        this.retrievePagination();
      }
    },
    retrieve() {
      if(this.filterBy=='Genre'){
        GameDataService.getByGenre(this.genreSelected)
        .then(response =>{
          this.articles = response.data;
          console.log('data')
          console.log(response.data)
        })
        .catch(e=>{
          this.errors(e)
        })
      }else if(this.filterBy=='Platform'){
        GameDataService.getByPlatform(this.platformSelected)
        .then(response =>{
          this.articles = response.data;
          console.log('data')
          console.log(response.data)
        })
        .catch(e=>{
          this.errors(e)
        })
      }else if(this.filterBy=='Search'){
        GameDataService.search(this.searchStringLast)
        .then(response =>{
          this.articles = response.data;
          console.log('data')
          console.log(response.data)
        })
        .catch(e=>{
          this.errors(e)
        })
      }else{
        GameDataService.getAll()
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
    selectGenre: function (genre){
      this.loading =  true;
      this.filterBy = 'Genre';
      if(this.genreSelected!=genre){
        this.genreSelected=genre;
        this.page=1;
      }
      if(genre=='All'){
        this.page=1;
        this.filterBy = 'Default';
      }
        this.retrieve();
        const params = this.getRequestParams(this.page, this.perPage);
        GameDataService.getPaginationByGenre(params, genre)
        .then(response =>{
          this.articlesPerPage = response.data;
          console.log('data')
          console.log(response.data)
          this.loading = false
        })
        .catch(e=>{
          this.errors(e)
        })
    },
    selectPlatform: function (platform){
      this.loading =  true;
      this.filterBy = 'Platform';
      if(this.platformSelected!=platform){
        this.platformSelected=platform;
        this.page=1;
      }
      if(platform=='All'){
        this.page=1;
        this.filterBy = 'Default';
      }
        this.retrieve();
        const params = this.getRequestParams(this.page, this.perPage);
        GameDataService.getPaginationByPlatform(params, platform)
        .then(response =>{
          this.articlesPerPage = response.data;
          console.log('data')
          console.log(response.data)
          this.loading = false
        })
        .catch(e=>{
          this.errors(e)
        })
    },
    searchGame () {
      this.loading = true
      this.filterBy = 'Search';
      if(this.searchStringLast!=this.searchString){
        this.searchStringLast=this.searchString;
        this.page=1;
      }
      this.retrieve();
      const params = this.getRequestParams(this.page, this.perPage);
      GameDataService.searchPagination(this.searchString, params)
      .then(response =>{
        this.articlesPerPage = response.data;
        console.log('data')
        console.log(response.data)
        this.loading = false
      })
      .catch(e=>{
        this.errors(e)
      })
    }
  },
  mounted(){
    this.retrieve();
    this.retrievePagination();
  },
}

</script>
<style scoped src="@/assets/styles/style.css"></style>