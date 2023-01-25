import {vueProductModal,vueDelProductModal,vuePagination} from "./modal.js";
let productModal;
let delProductModal;
const app={
    data(){
        return {
            productsList:[],
            templateProduct:{
                imagesUrl:[]
            },
            is_uploading:false,
            pagination:{},
        }
    },
    methods: {
        getData(num,...category){
            axios.get(`/v2/api/${apiPath}/admin/products?page=${num}`)
            .then(res=>{
                this.productsList=res.data.products;
                this.pagination=res.data.pagination;
                this.pageCount();
            })
            .catch(err=>{
                alert(err.data.message);
            })
        },
        OpenModal(...data){
            let item={imagesUrl:[]};
            let modal=productModal;
            if(data[0]=="del"){
                item=data[1];
                modal=delProductModal;
            }else if(data[1]){
                item=data[1];
            }
            this.templateProduct=item;
            const inputFile=document.querySelectorAll(`input[type="file"]`);
            inputFile.forEach(item=>item.value='');
            modal.show();
        },
        saveProduct(){
            let id=this.templateProduct.id;
            let url;
            let method;
            if(id){
                this.templateProduct.updateAt=this.currentTime();
                url=`/v2/api/${apiPath}/admin/product/${id}`;
                method='put';
            }else{
                this.templateProduct.createAt=this.currentTime();
                url=`/v2/api/${apiPath}/admin/product`;
                method='post';
            }
            let data={data:this.templateProduct};
            axios[method](url,data)
            .then(res=>{
                alert(res.data.message);
                this.getData(1);
                productModal.hide();
            })
            .catch(err=>{
                alert(err.data.message);
            })
        },
        delProduct(){
            axios.delete(`/v2/api/${apiPath}/admin/product/${this.templateProduct.id}`)
            .then(res=>{
                this.getData(1);
                delProductModal.hide();
            })
            .catch(err=>{
                alert(err.data.message);
            })
        },
        createImg(){
            this.templateProduct.imagesUrl=[''];
        },
        uploadImg(item){
            this.is_uploading=!this.is_uploading;
            let form=new FormData();
            form.append('file',item.data)
            axios.post(`/v2/api/${apiPath}/admin/upload`,form)
            .then(res=>{
                this.is_uploading=!this.is_uploading;
                if(item.key!==undefined){
                    this.templateProduct.imagesUrl[item.key]=res.data.imageUrl;
                }else{
                    this.templateProduct.imageUrl=res.data.imageUrl;
                }
            })
            .catch(err=>{
                alert(err)
            })
        },
        pageCount(){
            let total=this.pagination.total_pages;
            this.pagination.pageNum=[];
            for(let i=1;i<=total;i++){
                this.pagination.pageNum.push(i);
            }
        },
        currentTime(){
            const now=new Date();
            let month=this.addZero(now.getMonth()+1);
            let day=this.addZero(now.getDate());
            let hour=this.addZero(now.getHours());
            let minute=this.addZero(now.getMinutes());
            let second=this.addZero(now.getSeconds());
            return `${now.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`;
        },
        addZero(num){
            let str=`${num}`;
            if(str.length<2){
                str='0'+str;
            }
            return str;
        }
    },
    components:{
        vueProductModal,
        vueDelProductModal,
        vuePagination
    },
    mounted() {
        const token=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
        if(token) {
            axios.defaults.headers.common['Authorization']=token;
            axios.post(`/v2/api/user/check`)
            .then(res=>{
                productModal = new bootstrap.Modal(document.getElementById('productModal'));
                delProductModal=new bootstrap.Modal(document.getElementById('delProductModal'));
                this.getData(1);
            })
            .catch(err=>{
                alert(err.data.message);
                location.href="./index.html";
            })
        }else{
            alert('請先登入!');
            location.href="./index.html";
        }
    },
}

Vue.createApp(app).mount("#app");