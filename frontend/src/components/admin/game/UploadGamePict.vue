<template>
<div v-if="adminAuth">
  <div class="file text--left">
    <h4>Upload File</h4>
    <form @submit.prevent="onSubmit"  enctype="multipart/form-data">
      <div class="fields">
        <v-container>
          <v-file-input 
            v-model="file" 
            label="Select Image File..." 
            accept="image/*"
            type="file"
            ref="file"
            @change="onSelect"
          ></v-file-input>
        </v-container>
      </div>
      <div class="fields button">
        <button>Submit</button>
      </div>
    </form>
  </div>
</div>

<div v-else>
    <h4>Admin Content</h4>
  </div>
</template>

<script>

import http from "@/http";
import authHeader from '../../../services/auth-header';
export default {
  name: 'UploadFiles',
  data() {
    
    return {
      file: "",
      idGameSelected: this.$route.params.id_game,
      adminAuth: false
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
        await http.put('http://localhost:8000/api/game_save/'+ this.idGameSelected, formData);
        this.message = 'Uploaded !!'
      }
      catch(err) {
        console.log(err);
        this.message = 'Wrong !!'
      }
    },
    authenticateAdmin() {
          http.get('http://localhost:8000/api/admin/auth', { headers: authHeader() })
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
.file {
  max-width: 400px;
  margin-left: 50px;
  margin-top: 100px;
}
.button{
  margin-left: 300px;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 5px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>