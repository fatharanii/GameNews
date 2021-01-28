const client = require ('../util/database')

//==================NEWS FUNCTION======================

module.exports = {
    getAllnews : async function getAllnews(){
        const result = await client.export().query('SELECT * FROM public.news_item')
        return result
    },

    getNewsPagination : async function getNewsPagination(startIndex, limit){
        const result = await client.export().query('SELECT * FROM public.news_item limit $2 offset $1', [startIndex, limit])
        return result
    },

    getNewsByJudul : async function getNewsByJudul(judul_berita){
        const result = await client.export().query('SELECT * FROM public.news_item WHERE judul_berita ILIKE $1 ', ['%'+judul_berita+'%'])
        return result
    },
    
    getNewsBySearchPagination : async function getNewsBySearchPagination(startIndex, limit, judul_berita){
        const result = await client.export().query('SELECT * FROM public.news_item WHERE judul_berita ILIKE $1 limit $2 offset $3', ['%'+judul_berita+'%', limit, startIndex])
        return result
    },

    getNewsByKategori : async function getNewsByKategori(kategori){
        const result = await client.export().query('SELECT * FROM public.news_item WHERE kategori= $1',[kategori])
        return result
    },

    getNewsPaginationByKategori : async function getNewsPaginationByKategori(startIndex, limit, kategori){
        const result = await client.export().query('SELECT * FROM public.news_item WHERE kategori= $1 limit $2 offset $3',[kategori, limit, startIndex])
        return result
    },

    getAllNewsASC : async function getAllNewsASC(startIndex, limit){
        const result = await client.export().query('SELECT * FROM public.news_item ORDER BY publish_date DESC limit $2 offset $1', [startIndex, limit])
        return result
    },
    
    getFiveNewsASC : async function getFiveNewsASC(){
        const result = await client.export().query('SELECT * FROM public.news_item ORDER BY publish_date ASC limit 5')
        return result
    },
    
    insertNews : async function insertNews(id_game,judul_berita,kategori,isi){
        client.export().query(`INSERT INTO public.news_item(id_game,judul_berita,kategori,isi,lastupdate_date,publish_date)
        VALUES($1,$2,$3,$4,CURRENT_DATE,CURRENT_DATE)`,[id_game,judul_berita,kategori,isi])
    },
    
    deleteNews : async function deleteNews(id_berita){
        client.export().query('DELETE FROM public.news_item WHERE id_berita = $1', [id_berita])
    },
    
    updateNews : async function updateNews(id,id_game,judul_berita,kategori,isi){
        client.export().query(`UPDATE public.news_item SET id_game = $2, judul_berita = $3, kategori = $4, isi =$5,
        lastupdate_date = CURRENT_DATE WHERE id_berita = $1`,[id,id_game,judul_berita,kategori,isi])
    },

    getNewsThumbnail : async function getNewsThumbnail(id){
        const result = await client.export().query('SELECT thumbnail FROM public.news_item WHERE id_berita = $1', [id])
        return result
    },

    updateNewsThumbnail : async function updateNewsThumbnail(id, thumbnail){
        console.log(id)
        client.export().query(`UPDATE public.news_item SET thumbnail = $2
                        WHERE id_berita = $1`, [id, thumbnail])
    },

    deleteNewsThumbnail : async function deleteNewsThumbnail(id_berita){
        client.export().query(`UPDATE public.news_item SET thumbnail = NULL WHERE id_berita = $1`, [id])
    },

    getNewsById : async function getNewsById(id_berita){
        const result = await client.export().query('SELECT * FROM public.news_item WHERE id_berita = $1', [id_berita])
        return result
    }
}