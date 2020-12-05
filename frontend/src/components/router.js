import Vue from 'vue'
import VueRouter from 'vue-router'
import helloworld from './components/HelloWorld';
import ListNews from './components/cmsNews';
import ListGame from './components/ListGame';
import news from './components/news';
import home from './components/home';
import NewsById from './components/NewsById';
import GameById from './components/GameById';
import NewsList from './components/NewsList';

Vue.use(VueRouter)

const routes = [
    {
        path :"/cms",
        name : 'Listt',
        component :ListNews,
    },
    {
        path : "/cmsNews",
        name : 'List',
        component :NewsList,
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