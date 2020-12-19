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
      <v-btn
        icon
        color="black"
        @click="addToBookmark"
        class="mt-6 ml-2"
        x-small
      >
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>

            <div class="Newsbyid-isi" v-html="newsDetail.isi"></div>
        </v-container>
    </v-flex>
</v-app>
</template>

<script>
import http from "@/http";
import NewsDataService from "../../../services/NewsDataService";
import BookmarkDataService from "../../../services/BookmarkDataService";
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
    addToBookmark(){
    var data={
      id_user:this.id_user,
      id_berita: this.$route.params.id_berita
    }
      BookmarkDataService.add(data, { headers: authHeader() })
        .then(response => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
  },
  getUserId(){
      http.get('http://localhost:8000/api/user-id/auth')
      .then(response =>{
        this.id_user= response.data;
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
    this.getUserId();
  },
}

</script>
<style scoped src="@/assets/styles/style.css"></style>