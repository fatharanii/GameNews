import Vue from 'vue'
import VueRouter from 'vue-router'
import ListGame from '../components/user/read-game/ListGame';
import news from '../components/user/read-news/news';
import home from '../components/user/home';
import NewsById from '../components/user/read-news/NewsById';
import GameById from '../components/user/read-game/GameById';
import NewsList from '../components/admin/news/NewsList';
import NewsEdit from '../components/admin/news/NewsEdit';
import AddNews from '../components/admin/news/AddNews';
import AddGame from '../components/admin/game/AddGame';
import UploadNewsThumbnail from '../components/admin/news/UploadFiles';
import UploadGamePict from '../components/admin/game/UploadGamePict';
import GameList from '../components/admin/game/GameList';
import GameEdit from '../components/admin/game/GameEdit';
import UserList from '../components/admin/user-config/UserLIst';
import UserEdit from '../components/admin/user-config/UserEdit';
import AddUser from '../components/admin/user-config/AddUser';
import Login from '../components/user/user-auth/Login';
import SignUp from '../components/user/user-auth/SignUp';
import Bookmark from '../components/user/read-bookmark/Bookmark';
import Dashboard from '../components/admin/google-analytics/Analytics';
Vue.use(VueRouter)

const routes = [
    {
        path : "/dashboard",
        component : Dashboard
    },
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