<template>
  <div class="row justify-content-md-center">
    <div class="col-md-6">
      <div style=margin-top:100px v-if="!submitted" class="card">
          <div class="card-header">
            <h5>Login</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="form-group">
                  <label for="username">Username</label>
                  <input type="text" class="form-control" placeholder="Username.." v-model="user.username">
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" class="form-control" placeholder="Password.." v-model="user.password">
                </div>
                  <RouterLink :to="'/login/'">
                    <a href="#"><button @click="saveUser" type="submit" class="btn btn-primary">Submit</button></a>
                  </RouterLink>
                <v-btn
                cols="4"
                text
                >
                  <RouterLink :to="'/sign_up/'">
                    <a class="nav-link" href="#">Don't Have an Account? Sign Up Here</a>
                  </RouterLink>
                </v-btn>
              </form>
              <v-alert 
                dense
                outlined
                type="error"
                :icon="false"
                v-if="isError"
                class="text-center text-subtitle-2">
                {{errorMessage}}
              </v-alert>
          </div>
      </div>
      <div v-else>
        <v-alert 
              dense
              outlined
              type="success"
              :icon="false"
              class="text-center text-subtitle-2">
              You have already logged in successfully!
            </v-alert>          
            <RouterLink :to="'/'">
                  <a class="nav-link" href="#">Go To Home Page</a>
          </RouterLink>
      </div>
    </div>
     <v-overlay :value="loading">
        <v-progress-circular
            indeterminate
            size="64"
          color="#E52B38"
        ></v-progress-circular>
      </v-overlay>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import UserDataService from "../../../services/UserDataService";
export default {
  template: '#sign-in',
  name: "sign-in",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      loading :false,
      submitted: false,
      isError: false,
      errorMessage: "",
    };
  },
  methods: {
    saveUser() {
      this.loading=true
      var data = {
        username: this.user.username,
        password: this.user.password,
      };

      UserDataService.signIn(data)
        .then(response => {
          // console.log(response.data);
          // console.log(response.data.message);
          if(response.data.message != null) {
            this.errorMessage = response.data.message;
            this.isError = true;
            console.log(response.data);
            console.log(response.data.message);
            this.loading=false
          }
          //console.log(data.is_admin)
          else {
            console.log("Berhasil");
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(response.data));
            this.submitted = true;
            this.isError = false;
            this.$router.push({path: '/'});
            location.reload();
            this.loading=false
            return false;
            
          }
          // location.reload();
          // return false;
        })
        .catch(e => {
          //console.log(e);
          console.log(e);
        });
    },
    authenticateUser() {
          UserDataService.userAuthentication()
            .then(response => {
              this.submitted = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        }
  },
  mounted(){
    this.submitted = false;
    this.user = {};
    this.authenticateUser();
  }
};
</script>

<style scoped>
.btn-primary{
  background-color: #EF5350;
}

.card-header{
  background-color: #757575;
  color :white
}
.nav-link{
  color:#B71C1C;
}
</style>