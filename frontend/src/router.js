import Vue from 'vue'
import VueRouter from 'vue-router'
import helloworld from './components/HelloWorld';
import ListGame from './components/ListGame';
import news from './components/news';
import home from './components/home';
import NewsById from './components/NewsById';
import GameById from './components/GameById';
import NewsList from './components/NewsList';
import NewsCMS from './components/NewsCMS';
import AddNews from './components/AddNews';
import UploadNewsThumbnail from './components/UploadFiles';

Vue.use(VueRouter)

const routes = [
    {
        path : "/cmsNews",
        name : 'lists',
        component : NewsList
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
        name : 'NewsCMS',
        component :NewsCMS
    },
    {
        path :"/api/news-add/",
        name : 'AddNews',
        component :AddNews,
    },
    {
        path :"/api/news-update-thumbnail/:id_berita",
        name : 'UploadNewsThumbnail',
        component :UploadNewsThumbnail,
    },
];

const router = new VueRouter({
    routes,
    mode : 'history',
    scrollBehavior () {
        return { x: 0, y: 0 };
    }
})

export default router