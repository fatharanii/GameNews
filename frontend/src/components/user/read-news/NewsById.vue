<template>
<v-app light>
    <v-flex
        v-for="(newsDetail, i) in news"
        :key="i"
    >
        <v-container class="white pt-16" style="width: auto; margin-top:30px">
            <p class="Newsbyid-subtext"><kategori>{{ newsDetail.kategori }}</kategori></p>
            <h5>{{newsDetail.judul_berita}}</h5>
            <p class="Newsbyid-date">
              <span>{{new Date(newsDetail.publish_date).toLocaleString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                })}}
              </span>
            </p>
            <v-row>
              <v-col
                cols=""
                class="flex-grow-0 flex-shrink-0">
                <v-btn
                  icon
                  color="gray"
                  @click="addToBookmark"
                  v-if="!isAdded"
                  x-small
                >
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>
                <v-btn
                  icon
                  color="black"
                  @click="deleteBookmark"
                  v-else
                  x-small
                >
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>
              </v-col>
              <v-col
              cols="8"
              class="my-1">
                <h3 v-if="!isAdded">This news is not bookmarked</h3>
                <!-- <h3 v-if="isAdded">This news was bookmarked</h3> -->
              </v-col>
            </v-row>
            <div class="Gamebyid-gambar">
                <v-img
                    v-img v-bind:src="baseURL + '/api/news_thumbnail/' + newsDetail.id_berita"
                ></v-img>      
            </div>
            <div class="Newsbyid-isi" v-html="newsDetail.isi"></div>
        </v-container>
    </v-flex>
     <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64" color="#E52B38"></v-progress-circular>
      </v-overlay>
</v-app>
</template>

<script>
import NewsDataService from "../../../services/NewsDataService";
import BookmarkDataService from "../../../services/BookmarkDataService";
import BASE_URL from "../../../base-url"
import UserDataService from '../../../services/UserDataService';
export default {
  data(){
    return{
      drawer : false,
      loading :false,
      news : [],
      baseURL: BASE_URL,
      id_user : '',
      isAdded : false,
      id_readLater: '',
      userAuth: false
    }
  },
  methods:{
    async retrieve() {
      this.loading = true
        await UserDataService.getUserId()
          .then(response =>{
            this.id_user= response.data;
            //console.log('user id')
            //console.log(response.data)
            this.loading = false
          })
          .catch(e=>{
            console.log(e)
          })
        if(this.id_user != '') {
          BookmarkDataService.getBookmarkByUserAndNews(this.id_user,this.$route.params.id_berita)
            .then(response => {
              //console.log(response.data)
              if(response.data.length!=0){
                this.isAdded = true
                this.id_readLater = response.data[0].id_readLater;
                this.loading=false
              }
              else{
                //console.log(response.data)
              }
            })
            .catch(e=>{
              this.errors(e)
            })
          }
      //console.log(this.id_user);
      NewsDataService.get(this.$route.params.id_berita)
      .then(response =>{
        this.news = response.data;
        //console.log('data berita')
        //console.log(response.data)
        this.loading =false
      })
      .catch(e=>{
        this.errors(e)
      })
    },
    addToBookmark(){
      if(this.userAuth != false) {
        var data={
          id_user:this.id_user,
          id_berita: this.$route.params.id_berita
        }
        //console.log(data.id_user);
          BookmarkDataService.add(data)
            .then(response => {
              console.log(response.data);
              this.isAdded = true;
              location.reload();
            })
            .catch(e => {
              console.log(e);
            });
      }
      else {
        this.$router.push({path: '/login/'});
      }
    },
    deleteBookmark() {
      // var id_readLater;
      // await BookmarkDataService.getBookmarkByUserAndNews(this.id_user,this.$route.params.id_berita)
      //   .then(response => {
      //     console.log(response.data)
      //     if(response.data.length!=0){
      //       this.id_readLater = response.data[0].id_readLater;
      //       console.log(this.id_readLater);
      //     }
      //     else{
      //       console.log(response.data)
      //     }
      //   })
      //   .catch(e=>{
      //     this.errors(e)
      //   })
      
      BookmarkDataService.delete(this.id_readLater)
        .then(response => {
          //console.log(this.id_readLater)
          //console.log("berhasil")
          console.log(response.data)
          this.isAdded = false
          this.id_readLater = ''
          // location.reload()
          // return false
        })
        .catch(e=>{
          this.errors(e)
        })
    },
    authenticateUser() {
          UserDataService.userAuthentication()
            .then(response => {
              this.userAuth = response.data;
              //console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
    },
    // getUserId(){
    //   UserDataService.getUserId()
    //   .then(response =>{
    //     this.id_user= response.data;
    //     console.log('user id')
    //     console.log(response.data)
    //   })
    //   .catch(e=>{
    //     this.errors(e)
    //   })
    // },
    // checkBookmarked(){
    //   BookmarkDataService.getBookmarkByUserAndNews(this.id_user,this.$route.params.id_berita)
    //   .then(response => {
    //     console.log(response.data)
    //   })
    //   .catch(e=>{
    //     this.errors(e)
    //   })
    // },

    splitText(text){
        return text.split(",");
    }
  },
  mounted(){
    this.retrieve();
    this.authenticateUser();
  },
}

</script>
<style scoped src="@/assets/styles/style.css"></style>