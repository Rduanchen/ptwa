import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      meta: { requiresAuth: false },
      component: () => import("@/views/index.vue"),
    },
    //將遊戲選擇整合至一個頁面
    {
      path: "/GameSelect/:id",
      name: "GameSelect",
      component: () => import("@/views/GameSelect.vue"),
    },
    {
      path:"/Game/:Subject/:Grade/:id/:GameName",
      name:"Game",
      component:()=>import("@/views/Game.vue")
    },
    {
      path :"/GameTemplate",
      name: "GameTemplate",
      component:()=>import("@/views/GameTemplate/index.vue")
    },
    {
      path :"/TrueFalseGame",
      name: "TrueFalseGame",
      component:()=>import("@/views/GameTemplate/TrueFalseGame.vue")
    },
    {
      path :"/SelectGame",
      name: "SelectGame",
      component:()=>import("@/views/GameTemplate/SelectGame.vue")
    },
    {
      path :"/VirtualNumPad",
      name: "VirtualNumPad",
      component:()=>import("@/components/VirtualNumPad.vue")
    },
    {
      path:"/NumberInputGame",
      name:"NumberInputGame",
      component:()=>import("@/views/GameTemplate/NumberInputGame.vue")
    },
    {
      path:"/testdnd",
      name:"testdnd",
      component:()=>import("@/components/testdnd.vue")
    },
    {
      path:"/DragAndDropGame",
      name:"testdnd",
      component:()=>import("@/components/draganddrop.vue")
    },
    {
      path:"/ClassifyGame",
      name:"ClassifyGame",
      component:()=>import("@/views/GameTemplate/ClassifyGame.vue")
    },
    {
      path:"/SortGame",
      name:"SortGame",
      component:()=>import("@/views/GameTemplate/SortGame.vue")
    },
    {
      path:"/FindTheItemGame",
      name:"FindTheItemGame",
      component:()=>import("@/views/GameTemplate/FindTheItemGame.vue")
    },
    {
      path:"/AutoNumberingGame",
      name:"AutoNumberingGame",
      component:()=>import("@/views/GameTemplate/AutoNumberingGame.vue")
    },
    {
      path:"/NumberingGame",
      name:"NumberingGame",
      component:()=>import("@/views/GameTemplate/NumberingGame.vue")
    },
    {
      path:"/Calculator",
      name:"calculator",
      component:()=>import("@/components/calculator.vue")
    },
    {
      path:"/loading",
      name:"loading",
      component:()=>import("@/components/loading.vue")
    },
    {
      path:"/Link",
      name:"link",
      component:()=>import("@/components/link.vue")
    },
    {
      path:"/Link2",
      name:"link2",
      component:()=>import("@/components/link2.vue")
    },
    {
      path:"/GameStartandOver",
      name:"GameStartandOver",
      component:()=>import("@/component/GameStartandOver.vue")
    }
  ]
});
router.beforeEach((to, from, next) => {
  console.warn(`route: ${from.path} -> ${to.path}`);
  next();
});

export default router;
