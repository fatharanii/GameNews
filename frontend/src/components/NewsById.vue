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
                    v-img v-bind:src="'http://localhost:8000/api/news_thumbnail/' + newsDetail.id_berita"
                ></v-img>      
            </div>
            <p class="Newsbyid-isi">{{ newsDetail.isi }}</p>
        </v-container>
    </v-flex>
</v-app>
</template>

<script>
import http from "@/http";
export default {
  data(){
    return{
      drawer : false,
      news : []
    }
  },
  methods:{
    retrieve() {
      http.get('http://localhost:8000/api/news/'+ this.$route.params.id_berita)
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