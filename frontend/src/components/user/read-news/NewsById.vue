<template>
<v-app light>
    <v-flex
        v-for="(newsDetail, i) in news"
        :key="i"
    >
        <v-container class="white pt-16" style="width: 800px">
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
              v-if="!isAdded"
              class="mt-6 ml-2"
              x-small
            >
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>
            <v-btn v-if="isAdded"
              icon
              color="black"
              @click="addToBookmark"
              class="mt-6 ml-2"
              x-small
            >
        <span>Delete From Bookmark</span>
            </v-btn>
            <div class="Newsbyid-isi" v-html="newsDetail.isi"></div>
        </v-container>
    </v-flex>
</v-app>
</template>

<script>
// import http from "@/http";
import NewsDataService from "../../../services/NewsDataService";
import BookmarkDataService from "../../../services/BookmarkDataService";
import BASE_URL from "../../../base-url"
import UserDataService from '../../../services/UserDataService';
export default {
  data(){
    return{
      drawer : false,
      news : [],
      baseURL: BASE_URL,
      id_user : '',
      isAdded : false
    }
  },
  methods:{
    async retrieve() {
      await UserDataService.getUserId()
      .then(response =>{
        this.id_user= response.data;
        console.log('user id')
        console.log(response.data)
      })
      .catch(e=>{
        this.errors(e)
      })
      BookmarkDataService.getBookmarkByUserAndNews(this.id_user,this.$route.params.id_berita)
      .then(response => {
        console.log(response.data)
        if(response.data.length!=0){
          this.isAdded = true
        }
        else{
          console.log(response.data)
        }
      })
      .catch(e=>{
        this.errors(e)
      })
      console.log(this.id_user);
      NewsDataService.get(this.$route.params.id_berita)
      .then(response =>{
        this.news = response.data;
        console.log('data berita')
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
      console.log(data.id_user);
        BookmarkDataService.add(data)
          .then(response => {
            console.log(response.data);
            this.submitted = true;
            location.reload();
          })
          .catch(e => {
            console.log(e);
          });
    },
     deleteNewsFromBookmarkbyid(){
      BookmarkDataService.getBookmarkByUserAndNews(this.id_user,this.$route.params.id_berita)
      .then(response => {
        this.id_read_later=response.data[0].id_readLater
        console.log(response.data)
      })
      .catch(e=>{
        this.errors(e)
      })
          BookmarkDataService.delete(this.id_read_later)
            .then(response => {
              console.log(response.data);
            location.reload();
            })
            .catch(e => {
              console.log(e);
            });
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
<style scoped src="@/assets/styles/style.css">
</style>