import http from "../http";
import authHeader from '../services/auth-header';

class GameDataService {
    getById(id_game) {
        return http.get(`/api/game/${id_game}`)
    }

    getASC() {
        return http.get(`/api/gamesASC`);
    }

    getFiveGamesASC(){
        return http.get(`/api/home/NewGame`);
    }

    getAll() {
        return http.get(`/api/game/`)
    }

    async getAllGameSitemap(){
        const result = await http.get(`/api/game`)
        let array = []
        result.data.forEach((item)=>{
            array.push({
                id_game: item.id_game
            })
        })
        
        return array
    }

    getPagination(params) {
        return http.get(`/api/gamePagination/`,{params})
    }

    getByPlatform(platform) {
        return http.get(`/api/games/platform/${platform}`)
    }

    getByGenre(genre) {
        return http.get(`/api/games/genre/${genre}`)
    }

    getPaginationByGenre(params, genre) {
        return http.get(`/api/gamesPagination/genre/${genre}`,{params})
    }

    getPaginationByPlatform(params, platform) {
        return http.get(`/api/gamesPagination/platform/${platform}`,{params})
    }

    searchPagination(searchString, params) {
        return http.get(`/api/gamesPagination/search/${searchString}`,{params});
    }

    search(searchString) {
        return http.get(`/api/games/search/${searchString}`)
    }

    create(data) {
        return http.post(`/api/game`, data, { headers: authHeader() });
    }

    update(id_game, data) {
        return http.put(`/api/game/${id_game}`, data, { headers: authHeader() })
    }

    delete(id_game) {
        return http.delete(`/api/game/${id_game}`, { headers: authHeader() })
    }

    uploadGamePict(id_game, data) {
        return http.put(`/api/game_save/${id_game}`, data);
    }
}

export default new GameDataService();