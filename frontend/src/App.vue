<template>
  <body>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a class="navbar-brand" href="#">GameNews</a>
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

<style>
.fixed-top {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
}
.bg-dark {
    background-color: #343a40!important;
}
.navbar-expand-md {
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
    -ms-flex-pack: start;
    justify-content: flex-start;
}
.navbar {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: .5rem 1rem;
}
article, aside, figcaption, figure, footer, header, hgroup, main, nav, section {
    display: block;
}
*, ::after, ::before {
    box-sizing: border-box;
}
user agent stylesheet
nav {
    display: block;
}
body {
    padding-top: 1.5rem;
    color: #5a5a5a;
}
body {
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    background-color: #fff;
}
:root {
    --blue: #007bff;
    --indigo: #6610f2;
    --purple: #6f42c1;
    --pink: #e83e8c;
    --red: #dc3545;
    --orange: #fd7e14;
    --yellow: #ffc107;
    --green: #28a745;
    --teal: #20c997;
    --cyan: #17a2b8;
    --white: #fff;
    --gray: #6c757d;
    --gray-dark: #343a40;
    --primary: #007bff;
    --secondary: #6c757d;
    --success: #28a745;
    --info: #17a2b8;
    --warning: #ffc107;
    --danger: #dc3545;
    --light: #f8f9fa;
    --dark: #343a40;
    --breakpoint-xs: 0;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --font-family-sans-serif: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    --font-family-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
}
html {
    font-family: sans-serif;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
}
*, ::after, ::before {
    box-sizing: border-box;
}
*, ::after, ::before {
    box-sizing: border-box;
}
</style>
