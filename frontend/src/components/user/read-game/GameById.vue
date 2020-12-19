<template>
<v-app light>
    <v-flex
        v-for="(games, i) in game"
        :key="i"
    >
        <h4>{{games.judul_game}}</h4>
        <v-container class="grey lighten-4" style="width: 1000px">
        <v-row no-gutters>
            <v-col
            color="grey lighten-2"
            cols="6"
            class="flex-grow-0 flex-shrink-0"
            >
                <div class="Gamebyid-gambar">
                    <v-img
                        v-img v-bind:src="baseURL + '/api/game_allthumbnail/' + games.id_game"
                    ></v-img>  
                </div>
            </v-col>
            <v-col
            cols=""
            class="flex-grow-1 flex-shrink-0"
            >
                <p class="Gamebyid-subtext"><genre>{{ games.genre }}</genre></p>
                <p class="Gamebyid-desc">{{ games.description }}</p>
                <p class="Gamebyid-subtext">Release date : {{ games.release_date }}</p>
                <pre class="Gamebyid-subtext">Publisher      : {{ games.publisher }}</pre>
                <pre class="Gamebyid-subtext">Platform       : {{ games.platform }}</pre>
                <pre class="Gamebyid-subtext">Harga           : {{ games.price }}</pre>
            </v-col>
        </v-row>
        </v-container>
        <v-container class="grey lighten-4 my-3" style="width: 1000px">
            <h3>System Requirement</h3>
            <v-row 
            v-for="(sR, i) in splitText(games.system_requirement)"
            :key="i" 
            class="Gamebyid-subtext">
            - {{sR}}</v-row>
        </v-container>
    </v-flex>
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
      game : [],
      baseURL: BASE_URL
    }
  },
  methods:{
    retrieve() {
      GameDataService.getById(this.$route.params.id_game)
      .then(response =>{
        this.game = response.data;
        console.log('data')
        console.log(response.data)
      })
      .catch(e=>{
        this.errors(e)
      })
    },
    splitText(text){
        return text.split(",");
    }
  },
  mounted(){
    this.retrieve();
  },
}

</script>
<style scoped src="@/assets/styles/style.css"></style>