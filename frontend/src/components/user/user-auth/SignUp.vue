<template>
  <div class="row justify-content-md-center">
    <div class="col-md-6">
      <div style=margin-top:60px class="card">
        <div class="card-header">
          Sign Up
        </div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="username">Username</label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <input type="text" class="form-control" placeholder="Name.." v-model="user.username">
                  <span style="color:red">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <label for="email">Email address</label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <input type="email" class="form-control" placeholder="Email.." v-model="user.email">
                  <span style="color:red">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <input type="password" class="form-control" placeholder="Password.." v-model="user.password">
                  <span style="color:red">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <label for="password">Masukkan Ulang Password</label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <input type="password" class="form-control" placeholder="Password.." v-model="reenteredPassword">
                  <span style="color:red">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <RouterLink :to="'/sign_up/'">
                  <a href="#"><button @click="saveUser" type="submit" class="btn btn-primary">Submit</button></a>
                </RouterLink>
            </form>
          </div>
          <v-alert 
              dense
              outlined
              type="error"
              :icon="false"
              v-if="isError"
              class="text-center text-subtitle-2">
              {{errorMessage}}
            </v-alert>

          <v-alert 
              dense
              outlined
              type="success"
              :icon="false"
              v-if="submitted"
              class="text-center text-subtitle-2">
              You have registered successfully!
            </v-alert>

          <v-alert 
              dense
              outlined
              type="error"
              :icon="false"
              v-if="differentPassword"
              class="text-center text-subtitle-2">
              Masukkan password yang sama dengan password yang anda masukkan sebelumnya
            </v-alert>

            <v-alert 
              dense
              outlined
              type="error"
              :icon="false"
              v-if="dataIsNotCompleted"
              class="text-center text-subtitle-2">
              Lengkapi data terlebih dahulu
            </v-alert>
      </div>
    </div>
  </div>
</template>

<script>

// import http from "@/http";
import "bootstrap/dist/css/bootstrap.css";
import UserDataService from "../../../services/UserDataService";
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
extend('required', {
  ...required,
  message: 'This field is required'
});
export default {
  components: {
    ValidationProvider
  },
  template: '#sign-up',
  name: "sign-up",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        is_admin: false
      },
      submitted: false,
      isError: false,
      errorMessage: "",
      reenteredPassword: "",
      differentPassword: false,
      dataIsNotCompleted: false
    };
  },
  methods: {
    clearErrorMessage() {
      this.isError = false;
      this.differentPassword = false;
      this.dataIsNotCompleted = false;
    },
    saveUser() {
      var data = {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        is_admin: this.user.is_admin
      };
      var passwordVerification = this.reenteredPassword;

      if(this.user.username=="" || this.user.email=="" || this.user.password==""
       || this.reenteredPassword=="") {
         this.clearErrorMessage();
         this.dataIsNotCompleted = true;
      }
      else {
        this.dataIsNotCompleted = false;
        if(this.user.password != passwordVerification) {
          this.clearErrorMessage();
          this.differentPassword = true;
        }
        else {
          this.differentPassword = false;
          UserDataService.signUp(data)
            .then(response => {
              if(response.data.message != "registered sucessfully") {
                this.submitted = false;
                this.isError = true;
                this.errorMessage = response.data.message;
                console.log(response.data.message);
                console.log(response.data);
                console.log(data.is_admin)
              }
              else {
                console.log(response.data);
                console.log(data.is_admin)
                this.submitted = true;
                this.isError = false;
                this.$router.push({path: '/login/'});
              }
            })
            .catch(e => {
              console.log(e);
            });
        }
      }

      
      

      
    },
    
    // newUser() {
    //   this.submitted = false;
    //   this.user = {};
    // }
  },
  mounted(){
    this.submitted = false;
    this.user = {};
  }
};
</script>