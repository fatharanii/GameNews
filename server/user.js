//==============USER FUNCTION================
const client = require ('./database')

module.exports = {
    getAllUser : async function getAllUser(){
        const result = await client.export().query('SELECT * FROM public.user')
        return result
    },
    getOneUser : async function getOneUser(id_user){
        const result = await client.export().query('SELECT * FROM public.user WHERE id_user = $1', [id_user])
        return result
    },
    insertUser : async function insertUser(username, email, password, isAdmin){
        client.export().query(`INSERT INTO public.user(username, email, password, is_admin)
        VALUES ($1, $2, $3, $4)`, [username, email, password, isAdmin])
    },
    deleteUser : async function deleteUser(id_user){
        client.export().query('DELETE FROM public.user WHERE id_user = $1', [id_user])
    },
    updateUser : async function updateUser(id, username, email, password, isAdmin){
        client.export().query(`UPDATE public.user SET username = $2, email = $3, password = $4, is_admin = $5
                        WHERE id_user = $1`, [id, username, email, password, isAdmin])
    },
    getUserByUsername : async function getUserByUsername(username){
        const result = await client.export().query('SELECT * FROM public.user WHERE username LIKE $1', ['%'+username+'%'])
        return result
    },
    getOneUserByUsername : async function getOneUserByUsername(username){
        const result = await client.export().query('SELECT * FROM public.user WHERE username = $1', [username])
        return result
    },
    getIDUserByUsername : async function getOneUserByUsername(username){
        const result = await client.export().query('SELECT id_user FROM public.user WHERE username = $1', [username])
        return result
    },
    getOneUserByEmail : async function getOneUserByEmail(email){
        const result = await client.export().query('SELECT * FROM public.user WHERE email = $1', [email])
        return result
    },
    getOneUserAdmin : async function getOneUserAdmin(id_user){
        const result = await client.export().query('SELECT is_admin FROM public.user WHERE id_user = $1', [id_user])
        return result
    },
    getOneUserPass : async function getOneUserPass(username){
        const result = await client.export().query('SELECT password FROM public.user WHERE username = $1', [username])
        return result
    },
    string_to_boolean : function string_to_boolean (isAdmin){
        if (isAdmin == "true") {
            return true
        }
        return false
    }
}