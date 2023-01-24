

export const vueProductModal = {
    props: ['templateProduct', 'saveProduct', 'createImg'],
    methods:{
        uploadPic(...arg){
            let input=this.$refs.fileInput;
            let idx=arg[0];
            if(arg[0]!==undefined){
                if(input[idx].files[0]){
                    this.$emit('upload-image',{data:input[idx].files[0],key:idx});
                }else{
                    alert("請選擇圖片");
                }
            }else{
                if(input.files[0]){
                    this.$emit('upload-image',{data:input.files[0]});
                }else{
                    alert("請選擇圖片");
                }
            }
        }
    },
    template: `<div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
                <h5 id="productModalLabel" class="modal-title">
                    <span>新增產品</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="mb-2">
                            <div class="mb-3">
                                <label for="imageUrl" class="form-label">輸入圖片網址</label>
                                <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="templateProduct.imageUrl">
                                </div>
                                <div class="mb-3">
                                <form enctype="multipart/form-data" method="post">
                                <input type="file" class="form-control" ref="fileInput" name="file-to-upload">
                                <input type="submit" class="mt-3 btn btn-outline-primary btn-sm d-block w-100" @click.prevent="uploadPic()">
                                </form> 
                            </div>
                            <img class="img-fluid" :src="templateProduct.imageUrl" :alt="templateProduct.title" v-if="templateProduct.imageUrl">
                        </div>
                        <div class="mb-3">多圖新增</div>
                        <div v-if="Array.isArray(templateProduct.imagesUrl)">
                        <div v-for="(img,key) in templateProduct.imagesUrl" :key="templateProduct.title+img+key">
                            <div class="mb-3">
                                <label for="imageUrl" class="form-label">輸入圖片網址</label>
                                <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="templateProduct.imagesUrl[key]">
                            </div>
                            <div class="mb-3">
                                <form enctype="multipart/form-data" method="post">
                                <input type="file" class="form-control" ref="fileInput" name="file-to-upload">
                                <input type="submit" class="mt-3 btn btn-outline-primary btn-sm d-block w-100" @click.prevent="uploadPic(key)">
                                </form> 
                            </div>
                            <img class="img-fluid" :src="img" :alt="templateProduct.title" v-if="img">
                        </div>
                        <div v-if="!templateProduct.imagesUrl.length||templateProduct.imagesUrl[templateProduct.imagesUrl.length-1]&&templateProduct.imagesUrl.length<5">
                            <button class="btn btn-outline-primary btn-sm d-block w-100" @click="templateProduct.imagesUrl.push('')">
                                新增圖片
                            </button>
                        </div>
                        <div v-else>
                            <button class="btn btn-outline-danger btn-sm d-block w-100" @click="templateProduct.imagesUrl.pop()">
                                刪除圖片
                            </button>
                        </div>
                    </div>
                    <div v-else>
                        <button class="btn btn-outline-primary btn-sm d-block w-100" @click="createImg">
                            新增圖片
                        </button>
                    </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="mb-3">
                            <label for="title" class="form-label">標題</label>
                            <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                                v-model="templateProduct.title">
                        </div>

                        <div class="row">
                            <div class="mb-3 col-md-6">
                                <label for="category" class="form-label">分類</label>
                                <input id="category" type="text" class="form-control" placeholder="請輸入分類"
                                    v-model="templateProduct.category">
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="price" class="form-label">單位</label>
                                <input id="unit" type="text" class="form-control" placeholder="請輸入單位"
                                    v-model="templateProduct.unit">
                            </div>
                        </div>

                        <div class="row">
                            <div class="mb-3 col-md-6">
                                <label for="origin_price" class="form-label">原價</label>
                                <input id="origin_price" type="number" min="0" class="form-control"
                                    placeholder="請輸入原價" v-model="templateProduct.origin_price">
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="price" class="form-label">售價</label>
                                <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                                    v-model="templateProduct.price">
                            </div>
                        </div>
                        <hr>

                        <div class="mb-3">
                            <label for="description" class="form-label">產品描述</label>
                            <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述"
                                v-model="templateProduct.description">
            </textarea>
                        </div>
                        <div class="mb-3">
                            <label for="content" class="form-label">說明內容</label>
                            <textarea id="content" type="text" class="form-control" placeholder="請輸入說明內容"
                                v-model="templateProduct.content">
            </textarea>
                        </div>
                        <div class="mb-3">
                            <div class="form-check d-inline-block me-3">
                                <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1"
                                :false-value="0" v-model="templateProduct.is_enabled">
                                <label class="form-check-label" for="is_enabled">是否啟用</label>
                            </div>
                            <div class="form-check d-inline-block">
                            <input id="is_recommend" class="form-check-input" type="checkbox" :true-value="1"
                            :false-value="0" v-model="templateProduct.is_recommend">
                            <label class="form-check-label" for="is_recommend">小編推薦</label>
                            </div>
                            <span class="float-end" v-if="templateProduct.createAt">建立時間: <time>{{templateProduct.createAt}}</time></span><br>
                            <span class="float-end" v-if="templateProduct.updateAt">最後更新時間: <time>{{templateProduct.updateAt}}</time></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    取消
                </button>
                <button type="button" class="btn btn-primary" @click="saveProduct">
                    確認
                </button>
            </div>
        </div>
    </div>
</div>`
}

export const vueDelProductModal = {
    props: ['templateProduct', 'delProduct'],
    template: `<div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
    aria-labelledby="delProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
                <h5 id="delProductModalLabel" class="modal-title">
                    <span>刪除產品</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                是否刪除
                <strong class="text-danger">{{templateProduct.title}}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    取消
                </button>
                <button type="button" class="btn btn-danger" @click="delProduct">
                    確認刪除
                </button>
            </div>
        </div>
    </div>
</div>`
}

export const vuePagination = {
    props: ['pagination', 'getData'],
    template: `<nav aria-label="Page navigation example" v-if="pagination.total_pages>=0">
    <ul class="pagination">
        <li class="page-item" v-if="pagination.total_pages>1 && pagination.current_page>1" >
            <a class="page-link" href="#" aria-label="Previous" @click.prevent="getData(pagination.current_page*1-1)">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li class="page-item disabled" v-else>
            <a class="page-link" aria-label="Previous" aria-disabled="true">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li class="page-item" v-for="page in pagination.pageNum" :class="{'active':pagination.current_page==page}"><a class="page-link" href="#" @click.prevent="getData(page)">{{page}}</a></li>

        <li class="page-item"  v-if="pagination.total_pages>1 && pagination.current_page!=pagination.total_pages" >
            <a class="page-link" href="#" aria-label="Next" @click.prevent="getData(pagination.current_page*1+1)">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
        <li class="page-item disabled" v-else>
            <a class="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>`
}