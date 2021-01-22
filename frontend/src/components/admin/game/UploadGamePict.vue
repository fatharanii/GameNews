<template>
<div v-if="adminAuth">
  <form @submit.prevent="onSubmit"  enctype="multipart/form-data">
      <v-container>
        <v-card
          width="800px"
          :loading="loading"
          class="mx-auto my-12"
        >
        <v-card-title width="590" style="background:#EF5350;color:white" class="white--text mt-10">UPLOAD THUMBNAIL GAME</v-card-title>
          <v-row  justify="center">
            <v-col cols="12" md="10">
              <div class="fields">
                  <v-file-input 
                    v-model="file" 
                    label="Select Image File..." 
                    accept="image/*"
                    type="file"
                    ref="file"
                    @change="onSelect"
                  ></v-file-input>
              </div>
              <v-dialog
                  v-model="dialog"
                  persistent
                  max-width="440"
                  :retain-focus="false"
                >
              <template v-slot:activator="{ on, attrs }">
              <v-btn 
                class="float-right mb-2"
                elevation="6"
                color="error"
                width="140px"
                v-bind="attrs"
                v-on="on"
                @click="onSubmit"
                >Submit
              </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h8">
                  The Thumbnail Was Updated Successfully
                </v-card-title>
                <v-card-text></v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="warning"
                    dark
                    :to="'/cmsGame'"
                  >
                  Back to Dashboard
                </v-btn>
                </v-card-actions>
              </v-card>
             </v-dialog>
              <v-btn
                class="float-right mx-3 mb-2"
                elevation="6"
                color="warning"
                width="140px"
                dark
                :to="'/cmsGame'"
            >Cancel
            </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </form>
</div>

<div v-else>
    <h4>Admin Content</h4>
  </div>
</template>

<script>

// import http from "@/http";
// import authHeader from '../../../services/auth-header';
import GameDataService from "../../../services/GameDataService";
import UserDataService from '../../../services/UserDataService';
export default {
  name: 'UploadFiles',
  data() {
    
    return {
      file: "",
      idGameSelected: this.$route.params.id_game,
      adminAuth: false,
      dialog : false,
      loading : false
    }
  },
  methods: {
    onSelect(){
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    async onSubmit(){
      console.log(this.idGameSelected);
      const formData = new FormData();
      formData.append("thumbnail", this.file);
      try{
        console.log(this.idGameSelected);
        await GameDataService.uploadGamePict(this.idGameSelected, formData)
        this.message = 'Uploaded !!'
      }
      catch(err) {
        console.log(err);
        this.message = 'Wrong !!'
      }
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
  }
}
</script>

<style>
.container{
  margin-top: 100px;
}
</style>
