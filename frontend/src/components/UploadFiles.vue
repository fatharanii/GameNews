<template>
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
</template>

<script>

import http from "@/http";

export default {
  name: 'UploadFiles',
  data() {
    
    return {
      file: "",
      idBeritaSelected: this.$route.params.id_berita
    }
  },
  methods: {
    onSelect(){
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    async onSubmit(){
      console.log(this.idBeritaSelected);
      const formData = new FormData();
      formData.append("thumbnail", this.file);
      try{
        console.log(this.idBeritaSelected);
        await http.put('http://localhost:8000/api/news_pict/'+ this.idBeritaSelected, formData);
        this.message = 'Uploaded !!'
      }
      catch(err) {
        console.log(err);
        this.message = 'Wrong !!'
      }
    }
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