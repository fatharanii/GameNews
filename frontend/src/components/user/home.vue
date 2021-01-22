<template>
  <v-app light>
    <v-carousel
      cycle
      height="630"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(News, index) in news"
        :key="index"
        v-bind:src="baseURL + '/api/news_thumbnail/' + News.id_berita"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
          opacity="5"
        >
          <div class="news" >
            <p class="kategori"><kategori>{{ News.kategori }}</kategori></p>
            <RouterLink :to="'/news/'+News.id_berita" class="routerlinknews">
                <h3 class="judul" >{{ News.judul_berita}}</h3>
            </RouterLink>
            <div class="text-start" v-if="!readMoreActivated" v-html="News.isi.slice(0, 400)">
              </div>
              <readmore class="text-start" v-if="!readMoreActivated">
                <RouterLink :to="'/news/'+News.id_berita" class="routerlinknews">
                Read More
                </RouterLink>
              </readmore>
          </div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <h6>GAME TERBARU</h6>
    <v-slide-group
      class="pa-4"
      active-class="success"
      show-arrows
    >
      <v-slide-item
        v-for="(game, i) in articles"
        :key="i"
      >
        <v-card
          class="ma-4"
          max-width="300"
        >
         <v-progress-linear
            v-if="loading"
            color="error"
            indeterminate
          ></v-progress-linear>
          <v-img
            height="150"
            v-bind:src="baseURL + '/api/game_allthumbnail/' + game.id_game"
          ></v-img>
          <v-card-title>
            <RouterLink :to="'/game/'+game.id_game" class="routerlinkheadline">
                {{ game.judul_game }}
            </RouterLink></v-card-title>
          <v-card-text height="130">
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
            <p class="text-start" v-if="!readMoreActivated">{{ game.description.slice(0, 100) }}
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
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-app>
</template>

<script>
import GameDataService from "../../services/GameDataService";
import NewsDataService from "../../services/NewsDataService";
import "bootstrap/dist/css/bootstrap.css";
import BASE_URL from "../../base-url"
export default {
  data(){
    return{
      drawer : false,
      loading : false,
      articles :[],
      news:[],
      error:[],
      readMoreActivated : false,
      baseURL: BASE_URL
    }
  },
  methods:{
    created() {
      this.loading = true
      GameDataService.getFiveGamesASC()
      .then(response =>{
        this.articles = response.data;
        console.log('data')
        console.log(response.data)
        this.loading = false
      })
      .catch(e=>{
        this.errors(e)
      }),
      NewsDataService.home()
      .then(response =>{
        this.news = response.data;
        console.log('data')
        console.log(response.data)
        this.loading = false
      })
      .catch(e=>{
        this.errors(e)
      })
    },
  },
  mounted(){
    this.created();
  },
}
</script>

<style scoped src="@/assets/styles/style.css"></style>
