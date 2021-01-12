<template>
  <body>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a class="navbar-brand">GameNews</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <RouterLink :to="'/'" class="routerlinkgame">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="'/news/'" class="routerlinkgame">
              <a class="nav-link" href="#">News</a>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="'/game/'" class="routerlinkgame">
              <a class="nav-link" href="#">Game</a>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="'/bookmark/'" class="routerlinkgame">
              <a class="nav-link" href="#">Bookmark</a>
            </RouterLink>
          </li>
        </ul>
        <ul v-if="!userAuth" class="navbar-nav ">
          <li class="nav-item">
            <RouterLink :to="'/login/'" class="routerlinkgame">
              <a class="nav-link" href="#">Login</a>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="'/sign_up/'" class="routerlinkgame">
              <a class="nav-link" href="#">Sign Up</a>
            </RouterLink>
          </li>
        </ul>
        <ul v-if="adminAuth" class="navbar-nav ">
          <li class="nav-item">
            <RouterLink :to="'/cmsNews/'" class="routerlinkgame">
              <a class="nav-link" href="#">News CMS</a>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="'/cmsGame/'" class="routerlinkgame">
              <a class="nav-link" href="#">Game CMS</a>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="'/cmsUser/'" class="routerlinkgame">
              <a class="nav-link" href="#">User CMS</a>
            </RouterLink>
          </li>
        </ul>
        <ul v-if="userAuth" class="navbar-nav ">
          <li class="nav-item">
              <RouterLink :to="'/'" class="routerlinkgame">
                <a class="nav-link" href="#" @click="logOut">Logout</a>
              </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
      <div>
        <v-app>
          <router-view></router-view>
        </v-app>
      </div>
  </body>
</template>

<script>
import UserDataService from './services/UserDataService';
export default {
    name:"app",
    data () {
      return {
        userAuth: false,
        adminAuth: false
      }
    },
    methods:{
        authenticateUser() {
          UserDataService.userAuthentication()
            .then(response => {
              this.userAuth = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
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
        },
        logOut() {
          localStorage.removeItem('user');
          location.reload();
          return false;
        }
    },
    mounted(){
      this.authenticateUser();
      this.authenticateAdmin();
    },
};
</script>