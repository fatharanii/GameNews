<template id="add-news">
<div v-if="adminAuth">
    <v-form ref="form" v-model="valid">
        <v-container>
          <v-card
            width="800px"
            :loading="loading"
            class="mx-auto my-12">
            <v-card-title width="590" style="background:#EF5350;color:white" class="white--text mt-10">ADD NEWS</v-card-title>
            <v-row  justify="center">
                <v-col cols="12" md="10">
                    <div class="text-h6">ID Game</div>
                    <v-text-field
                        v-model="news.id_game"
                        :rule="idgameRules"
                        placeholder="Id Game"
                        required
                        name="id_game"
                        id="id_game"
                    >
                    </v-text-field>
                    <div class="text-h6"> Judul Berita</div>
                    <v-text-field
                        v-model="news.judul_berita"
                        :rules="judulRules"
                        :counter="100"
                        placeholder="Judul Berita"
                        required
                        name="judul_berita"
                        id="judul_berita"
                    >
                    </v-text-field>
                    <div class="text-h6">Kategori</div>
                    <v-select
                        v-model="news.kategori"
                        :items="listKategori"
                        :rules="kategoriRules"
                        placeholder="Pilih Kategori"
                        requires
                        name="kategori"
                        id="kategori"
                    >
                    </v-select>
                     <div class="text-h6">Konten Berita</div>
                    <vue-editor
                        id="editor"
                        v-model="news.isi"
                    >
                    </vue-editor>
                     <v-btn
                        class="float-right mt-2"
                        elevation="6"
                        color="error"
                        width="140px"
                        large
                        @click="saveNews"
                        :disabled="!valid"
                    >Add
                    </v-btn>
                      <v-btn
                        class="float-right mt-2 mx-3"
                        elevation="6"
                        color="warning"
                        width="140px"
                        large
                        dark
                        :to="'/cmsNews'"
                    >Cancel
                     </v-btn>
                </v-col>
            </v-row>
          </v-card>
        </v-container>
    </v-form>
   </div>
     <div v-else>
      <h4>Admin Content</h4>
    </div>
</template>

<script>
// import http from "@/http";
import NewsDataService from "../../../services/NewsDataService";
import UserDataService from '../../../services/UserDataService';
import { VueEditor } from "vue2-editor";
import authHeader from '../../../services/auth-header';
export default {
  components: { VueEditor },
  data(){
    return{
      valid: true,
      news:{
        id_game:"",
        judul_berita:"",
        kategori:"",
        isi:"",
      },
      listKategori: ['Action','Survival','Strategy','Adventure','Sport'],
      judulRules:[
        (v) => !!v || "Judul tidak boleh kosong.",
        (v) => v.length <= 100 || "Judul maksimal 100 karakter",
        (v) => v.length >= 3 || "Judul harus minimal 3 karakter",
      ],
      kategoriRules: [(v) => !!v || "Kategori tidak boleh kosong."],
      isiRules:[
        (v) => !!v|| "Konten Berita Tidak Boleh kosong"
      ],
      submitted: false,
      adminAuth: false
    }
  },
  methods:{
    saveNews(){
      var data ={
        id_game: Number(this.news.id_game),
        judul_berita: this.news.judul_berita,
        kategori: this.news.kategori,
        isi: this.news.isi
      };
      NewsDataService.create(data, { headers: authHeader() })
        .then(response => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newNews() {
      this.submitted = false;
      this.news = {};
    },

    authenticateAdmin() {
          UserDataService.adminAuthentication()
            .then(response => {
              this.adminAuth = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        }
  },
  mounted(){
      this.authenticateAdmin();
    },
};
</script>

<style>
.submit-form {
  max-width: 400px;
  margin: auto;
  margin-top: 100px;
}
</style>
