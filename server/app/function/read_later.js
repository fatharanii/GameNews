const client = require ('../util/database')

//========READ LATER FUNCTION===================

module.exports = {
    getAllReadLater : async function getAllReadLater(){
        const result = await client.export().query('SELECT * FROM public.read_later')
        return result
    },
    
    addReadLater : async function addReadLater(id_user, id_berita){
        client.export().query(`INSERT INTO public.read_later(id_user, id_berita)
        VALUES ($1, $2)`, [id_user, id_berita])
    },
    
    deleteBookmark : async function deleteBookmark(id){
        client.export().query('DELETE FROM public.read_later WHERE "id_berita" = $1', [id])
    },
    
    getUserBookmark : async function getUserBookmark(id){
        const result = await client.export().query('SELECT * FROM public.read_later WHERE id_user = $1', [id])
        return result
    }
	
	getNewsByJudul : async function getNewsByJudul(judul_berita){
        const result = await client.export().query('SELECT * FROM public.read_kater WHERE judul_berita ILIKE $1 ', ['%'+judul_berita+'%'])
        return result
    },
}