<template>
<v-app light>
    <v-flex
        v-for="(games, i) in game"
        :key="i"
    >
        <h4>{{games.judul_game}}</h4>
        <v-container class="grey lighten-4" style="width: 1000px; margin-top:30px">
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
                <p class="Gamebyid-subtext">Release date : <span>{{new Date(games.release_date).toLocaleString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                })}}</span></p>
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
      loading:false,
      game : [],
      baseURL: BASE_URL
    }
  },
  methods:{
    retrieve() {
      this.loading = true
      GameDataService.getById(this.$route.params.id_game)
      .then(response =>{
        this.game = response.data;
        console.log('data')
        console.log(response.data)
        this.loading = false
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