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
              :loading="loading"
              class="mx-1 my-2"
              max-width="350"
              height="500"
              hover
            >
              <v-img
                v-img v-bind:src="baseURL + '/api/game_allthumbnail/' + game.id_game"
              ></v-img>
              <v-card-title>{{ game.judul_game }}</v-card-title>
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
        @click="retrieve"
        class="mt-6 ml-2"
        x-small
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn
        flat
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
          <v-card
            v-for="n in genre"
            :key="n"
            class="kategori pa-1 mx-1 my-2"
            outlined
            tile
          >
            <button
            v-on:click="selectGenre(n)">
						{{n}}</button>
          </v-card>
        </v-card>
      </div>
      <div class="game_by">
        <h2>Platform :</h2>
        <v-card
          class="d-flex align-content-center flex-wrap"
          flat
          tile
        >
          <v-card
            v-for="n in platform"
            :key="n"
            class="kategori pa-1 mx-1 my-2"
            outlined
            tile
          >
            <button
            v-on:click="selectPlatform(n)">
						{{n}}</button>
          </v-card>
        </v-card>
      </div>
    </v-col>
  </v-row>
</v-app>
</template>

<script>
// import http from "@/http";
import BASE_URL from "../../../base-url";
import GameDataService from "../../../services/GameDataService";
export default {
  data(){
    return{
      drawer : false,
      articles :[],
      error:[],
      page: 1,
      perPage: 5,
      genre:["All","Action", "Survival","Strategy", "Adventure","Sport"],
      platform:["All","Steam", "Itch.io","GOG", "GamersGate","Humble Bundle", "Game Jolt"],
      searchString: '',
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
      GameDataService.getAll()
      .then(response =>{
        this.articles = response.data;
        console.log('data')
        console.log(response.data)
      })
      .catch(e=>{
        this.errors(e)
      })
    },
    selectGenre: function (genre){
      if(genre=="All"){
        this.retrieve();
      }else{
        GameDataService.getByGenre(genre)
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
    selectPlatform: function (platform){
      if(platform=="All"){
        this.retrieve();
      }else{
        GameDataService.getByPlatform(platform)
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
    searchGame () {
      GameDataService.search(this.searchString)
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
  mounted(){
    this.retrieve();
  },
}

</script>
<style scoped src="@/assets/styles/style.css"></style>