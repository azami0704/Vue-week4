
const app={
    data(){
        return {
            user:{
                username:'',
                password:''
            }
        }
    },
    methods: {
        login(){
            axios.post("/v2/admin/signin",this.user)
            .then(res=>{
                document.cookie=`token=${res.data.token};expires=${new Date(res.data.expired)};`
                location.href="./admin.html";
            })
            .catch(err=>{
                alert(err.data.message);
            })
        }
    },

}

Vue.createApp(app).mount('#app')