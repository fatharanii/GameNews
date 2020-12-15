import Vue from 'vue'
import VueRouter from 'vue-router'
import helloworld from './components/HelloWorld';
import ListGame from './components/ListGame';
import news from './components/news';
import home from './components/home';
import NewsById from './components/NewsById';
import GameById from './components/GameById';
import NewsList from './components/NewsList';
import NewsEdit from './components/NewsEdit';
import AddNews from './components/AddNews';
import AddGame from './components/AddGame';
import UploadNewsThumbnail from './components/UploadFiles';
import UploadGamePict from './components/UploadGamePict';
import GameList from './components/GameList';
import GameEdit from './components/GameEdit';
import UserList from './components/UserLIst';
import UserEdit from './components/UserEdit';
import AddUser from './components/AddUser';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Bookmark from './components/Bookmark';
Vue.use(VueRouter)

const routes = [
    {
        path : "/cmsNews",
        name : 'lists',
        component : NewsList
    },
    {
        path : "/cmsGame",
        name : 'GameList',
        component :GameList,
    },
    {
        path : "/cmsUser",
        name : 'UserList',
        component :UserList,
    },
    {
        path : "/login",
        name : 'Login',
        component :Login,
    },
    {
        path : "/sign_up",
        name : 'SignUp',
        component :SignUp,
    },
    {
        path :"/game",
        name : 'game',
        component :ListGame,
    },
    {
        path :"/news",
        name : 'news',
        component :news,
    },
    {
        path :"/",
        name : 'home',
        component :home,
    },
    {
        path :"/home",
        name : 'helloworld',
        component :helloworld,
    },
    {
        path :"/news/:id_berita",
        name : 'NewsById',
        component :NewsById,  
    },
    {
        path :"/game/:id_game",
        name : 'GameById',
        component :GameById,  
    },
    {
        path :"/api/news/:id_berita",
        name : 'NewsEdit',
        component :NewsEdit
    },
    {
        path :"/api/game/:id_game",
        name : 'GameEdit',
        component :GameEdit
    },
    {
        path :"/api/users/:id_user",
        name : 'UserEdit',
        component :UserEdit
    },
    {
        path :"/api/news-add/",
        name : 'AddNews',
        component :AddNews,
    },
    {
        path :"/api/game-add/",
        name : 'AddGame',
        component :AddGame,
    },
    {
        path :"/api/user-add/",
        name : 'AddUser',
        component :AddUser,
    },
    {
        path :"/api/news-update-thumbnail/:id_berita",
        name : 'UploadNewsThumbnail',
        component :UploadNewsThumbnail,
    },
    {
        path :"/api/games-update-thumbnail/:id_game",
        name : 'UploadGamePict',
        component :UploadGamePict,
    },
    {
        path :"/bookmark",
        name :'Bookmark',
        component :Bookmark,
    }
];

const router = new VueRouter({
    routes,
    mode : 'history',
    scrollBehavior () {
        return { x: 0, y: 0 };
    }
})

export default router