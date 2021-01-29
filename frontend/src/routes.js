import NewsDataService from './services/NewsDataService';
import GameDataService from './services/GameDataService';

export const routes = [
    {
        path : "/dashboard",
        component : () => import("./components/admin/google-analytics/Analytics"),
        meta: { sitemap: { ignoreRoute: true } }
    },
    {
        path : "/cmsNews",
        name : 'lists',
        component : () => import("./components/admin/news/NewsList"),
        meta: { sitemap: { ignoreRoute: true } }
    },
    {
        path : "/cmsGame",
        name : 'GameList',
        component :() => import("./components/admin/game/GameList"),
        meta: { sitemap: { ignoreRoute: true } }
    },
    {
        path : "/cmsUser",
        name : 'UserList',
        component :() => import("./components/admin/user-config/UserLIst"),
        meta: { sitemap: { ignoreRoute: true } }
    },
    {
        path : "/login",
        name : 'Login',
        component :() => import("./components/user/user-auth/Login"),
    },
    {
        path : "/sign_up",
        name : 'SignUp',
        component :() => import("./components/user/user-auth/SignUp"),
    },
    {
        path :"/game",
        name : 'game',
        component :() => import("./components/user/read-game/ListGame"),
    },
    {
        path :"/news",
        name : 'news',
        component :() => import("./components/user/read-news/news"),
    },
    {
        path :"/",
        name : 'home',
        component :() => import("./components/user/home"),
    },
    {
        path :"/news/:id_berita",
        meta: {
            sitemap: {
                // Slugs can also be provided asynchronously
                // The callback must always return an array
                slugs: async () => await NewsDataService.getAllNewsSitemap(),
            }
        },
        name : 'NewsById',
        component :() => import("./components/user/read-news/NewsById"),  
    },
    {
        path :"/game/:id_game",
        meta: {
            sitemap: {
                // Slugs can also be provided asynchronously
                // The callback must always return an array
                slugs: async () => await GameDataService.getAllGameSitemap(),
            }
        },
        name : 'GameById',
        component :() => import("./components/user/read-game/GameById"),  
    },
    {
        path :"/api/news/:id_berita",
        name : 'NewsEdit',
        component :() => import("./components/admin/news/NewsEdit"),
        meta: { sitemap: { ignoreRoute: true } }
    },
    {
        path :"/api/game/:id_game",
        name : 'GameEdit',
        component :() => import("./components/admin/game/GameEdit"),
        meta: { sitemap: { ignoreRoute: true } }
    },
    {
        path :"/api/users/:id_user",
        name : 'UserEdit',
        component :() => import("./components/admin/user-config/UserEdit"),
        meta: { sitemap: { ignoreRoute: true } }
    },
    {
        path :"/api/news-add/",
        name : 'AddNews',
        component :() => import("./components/admin/news/AddNews"),
        meta: { sitemap: { ignoreRoute: true } }
    },
    {
        path :"/api/game-add/",
        name : 'AddGame',
        component :() => import("./components/admin/game/AddGame"),
        meta: { sitemap: { ignoreRoute: true } }
    },
    {
        path :"/api/news-update-thumbnail/:id_berita",
        name : 'UploadNewsThumbnail',
        component :() => import("./components/admin/news/UploadFiles"),
        meta: { sitemap: { ignoreRoute: true } }
    },
    {
        path :"/api/games-update-thumbnail/:id_game",
        name : 'UploadGamePict',
        component :() => import("./components/admin/game/UploadGamePict"),
        meta: { sitemap: { ignoreRoute: true } }
    },
    {
        path :"/bookmark",
        name :'Bookmark',
        component :() => import("./components/user/read-bookmark/Bookmark"),
    }
];