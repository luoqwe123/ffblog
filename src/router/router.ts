

export const constant = [
    {
        path: '/',
        component: () => import('@/views/home/index.vue'),
        display:true,
        name: "home",
        icon:'home',
        meta: {

            appear: true,
            title: "首页"
        },

    },
    // {
    //     path: '/404',
    //     component: () => import('@/views/404/index.vue'),
    //     display:true,
    //     name: "404",
    //     meta: {

    //         appear: false,
    //         title: "404"
    //     }
    // },
    {
        path: '/label',
        component: () => import('@/views/Label/index.vue'),
        display:true,
        name: "Label",
        icon:'label',
        meta: {
            appear: false,
            title: "标签"
        }
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        display:true,
        name: "Login",
        icon:'login',
        meta: {
            appear: false,
            title: "登录/注册"
        }
    },
    // {
    //     path: '/dataScreen',
    //     component: () => import('@/views/login/index.vue'),
    //     display:true,
    //     name: "dataScreen",
    //     icon:'dataScreen',
    //     meta: {
    //         appear: true,
    //         title: "数据大屏"
    //     }
    // },
    // {
    //     path: '/milestone',
    //     component: () => import('@/views/login/index.vue'),
    //     display:true,
    //     name: "milestone",
    //     icon:'milestone',
    //     meta: {
    //         appear: true,
    //         title: "里程碑"
    //     }
    // },
    // {
    //     path: '/documentation',
    //     component: () => import('@/views/login/index.vue'),
    //     display:true,
    //     name: "documentation",
    //     icon:"md",
    //     meta: {
    //         appear: true,
    //         title: "文档"
    //     }
    // },
    {
        path: '/picture',
        component: () => import('@/views/picture/index.vue'),
        display:true,
        name: "picture",
        icon:"picture",
        meta: {
            appear: true,
            title: "图集"
        }
    },
    {
        path: '/essay',
        component: () => import('@/views/essay/publishEssay.vue'),
        display:true,
        name: "Essay",
        icon:'essay',
        //重定向
        redirect:"/editor",
        meta: {
            appear: true,
            title: "文章"
        },
        children:[
            {
                path:'/editor',
                component:()=>import("@/views/essay/sendArticle.vue"),
                display:true,
                name:"Editor",
                icon:"addArticle",
                meta:{
                    title:"添加文章"
                }
            },
            
            // {
            //     path: 'essayModeration',
            //     component: () => import('@/views/login/index.vue'),
            //     name: "Moderation",
            //     icon:"essayModeration",
            //     meta: {
            //         appear: true,
            //         title: "文章审核"
            //     }
            // },
            // {
            //     path: 'essayClassification',
            //     component: () => import('@/views/login/index.vue'),
            //     name: "classification",
            //     icon:"essayClassification",
            //     meta: {
            //         appear: true,
            //         title: "文章分类"
            //     }
            // },
            
        ]

    },
    {
        path:'/showArticle/:id',
        name:'showArticle',
        component:()=>import("@/views/essay/essayShow.vue"),
        display:false,
    },
    {
        path:'/editor',
        component:()=>import("@/views/essay/sendArticle.vue"),
        display:false,
        name:"Editor",
        icon:"addArticle",
        meta:{
            title:"添加文章"
        }
    }, 
    {
        path:'/update/:id',
        component:()=>import("@/views/essay/updateArticle.vue"),
        display:false,
        name:"update",
        icon:"addArticle",
        meta:{
            title:"修改文章"
        }
    },
    {
        path:'/category/:id',
        component:()=>import("@/views/Label/Label.article.vue"),
        display:false,
        name:"category",
        icon:"addArticle",
        meta:{
            title:"标签关联文章"
        }
    },  
    {
        path:'/loading',
        component:()=>import("@/components/loading/index.vue"),
        display:false,
        name:"Loading",
        icon:"addArticle",
        meta:{
            title:"加载页"
        }
    }, 

]