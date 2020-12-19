<template>
<v-app light>
    <v-flex
        v-for="(newsDetail, i) in news"
        :key="i"
    >
        <v-container class="white" style="width: 800px">
            <p class="Newsbyid-subtext"><kategori>{{ newsDetail.kategori }}</kategori></p>
            <h5>{{newsDetail.judul_berita}}</h5>
            <p class="Newsbyid-date">{{ newsDetail.publish_date }}</p>
            <div class="Gamebyid-gambar">
                <v-img
                    v-img v-bind:src="baseURL + '/api/news_thumbnail/' + newsDetail.id_berita"
                ></v-img>      
            </div>
            <div class="Newsbyid-isi" v-html="newsDetail.isi"></div>
        </v-container>
    </v-flex>
</v-app>
</template>

<script>
// import http from "@/http";
import NewsDataService from "../../../services/NewsDataService";
import BASE_URL from "../../../base-url"
export default {
  data(){
    return{
      drawer : false,
      news : [],
      baseURL: BASE_URL
    }
  },
  methods:{
    retrieve() {
      NewsDataService.get(this.$route.params.id_berita)
      .then(response =>{
        this.news = response.data;
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