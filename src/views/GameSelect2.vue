<!-- PC 11/22 -->
<!-- This document wait for add js and vue Feature -->

<ul class="navbar-nav d-flex">
  <li class="nav-item ">
      <!-- <a class="nav-link" @click="ChangeSubject('Math')"><img src="@/assets/button/math.png"/></a> -->
      <!-- <button class="btn btn-primary btn-sm m-3"><img src="@/assets/button/math.png"></button> -->
      <!-- <button class="btn btn-primary m-3" @click="ChangeSubject('Math')">數學</button> -->
      <!-- <a class="nav-link" @click="ChangeSubject('Math')" style="font-size: 1.5rem;">數學</a> -->
  </li>
  <li class="nav-item">
      <!-- <a class="nav-link" @click="ChangeSubject('Chinese')"><img src="@/assets/button/chinese.png"></a> -->
      <!-- <button class="btn btn-primary btn-sm m-3"><img src="@/assets/button/chinese.png"></button> -->
      <!-- <button class="btn btn-primary m-3" @click="ChangeSubject('Chinese')" >國文</button> -->
      <!-- <a class="nav-link" @click="ChangeSubject('Chinese')" style="font-size: 1.5rem;">國文</a> -->
  </li>
  <li class="nav-item ">
      <!-- <a class="nav-link" @click="ChangeSubject('Technology')"><img src="@/assets/button/technology.png"></a> -->
      <!-- <button class="btn btn-primary btn-sm m-3"><img src="@/assets/button/technology.png"></button> -->
      <!-- <button class="btn btn-primary m-3" @click="ChangeSubject('Technology')" >多元科技</button> -->
      <!-- <a class="nav-link" @click="ChangeSubject('Technology')" style="font-size: 1.5rem;">科技</a> -->
  </li>
  </ul>
<template>
    <header>
      <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand" href="#">回到首頁</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="" @click="ChangeSubject('Math')"><i class="bi bi-calculator"></i>數學</a>    
              </li>
              <li class="nav-item">
                <a class="nav-link" @click="ChangeSubject('Chinese')"><i class="bi bi-translate"></i>中文</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click="ChangeSubject('Technology')"><i class="bi bi-cpu"></i>多元科技</a>
              </li>
            </ul>
            
              <ol class="breadcrumb align-self-center">
                <li class="breadcrumb-item text-black"><i class="bi bi-house"></i><a href="#"> 主頁</a></li>
                <li class="breadcrumb-item active text-black" aria-current="page"><i class="bi bi-book-half"></i><a>  {{Subjects[Subject]}}</a></li>
              </ol>
            
            
          </div>
          <div class="navbar-nav">

          </div>
        </div>
      </nav> -->
      <nav class="container navbar navbar-expand-lg navbar-light sticky-top justify-content-center" style="width: 100%;">
          <a class="navbar-brand mt-2 mb-2" href="#" alt="Home">
              <img src="@/assets/images/nav_bar/logo.png" class="img-fluid" />
          </a>
          <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                  <li class="nav-item">
                      <a class="nav-link" @click="ChangeSubject('Math')"><img src="@/assets/button/math.png"/></a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" @click="ChangeSubject('Chinese')"><img src="@/assets/button/chinese.png"></a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" @click="ChangeSubject('Technology')"><img src="@/assets/button/technology.png"></a>
                  </li>
              </ul>
          </div>
          <div class="container sticky-top" style="width: 30%;--bs-breadcrumb-divider: '>';">
            <ol class="breadcrumb mb-0" >
              <li class="breadcrumb-item text-white"><i class="bi bi-house"></i><a href="#"> 主頁</a></li>
              <li class="breadcrumb-item active text-white" aria-current="page"><i class="bi bi-book-half"></i><a>  {{Subjects[Subject]}}</a></li>
            </ol>
          </div>
          <div class="d-none d-lg-flex">
              <form class="d-flex">
                  <input class="form-control me-2" type="search" placeholder="輸入id或是遊戲名稱" aria-label="Search">
                  <button class="btn btn-outline-success" type="submit">搜尋</button>
              </form>
          </div>
      </nav>
    </header>
    <section v-if="ShowMenu">
          <div class="d-flex flex-column align-items-center d-grid gap-5 justify-content-center Subject_container"  style="width: 100%; height: 90vh;">
            <p class="h1">請選科目</p>
            <a  @click="ChangeSubject('Math')"><img src="@/assets/button/math.png" style="width: 40vh;" /></a>
            <a  @click="ChangeSubject('Chinese')"><img src="@/assets/button/chinese.png" style="width: 40vh;" /></a>
            <a  @click="ChangeSubject('Technology')"><img src="@/assets/button/technology.png" style="width: 40vh;"/></a>
          </div>
    </section>
    <section class="GameSelectSection" style="overflow-y: hidden;" v-if="ShowContent">
        <div class="container">
            <div class="row">
                <div class="col-3 SideBar mt-4">
                    <div class="card">
                    <div class="card-body" :key="Refresh">
                        <h5 class="card-title mt-2">請選擇科目</h5>
                        <div class="list-group mt-2" v-for="(items,key) in ShowInfo" v-if="ShowInfo">
                          <a class="list-group-item list-group-item-action" v-on:click="SelectChapter(key)">{{ items.Title }}</a>
                        </div>
                    </div>
                  </div>
                </div>
                <!-- NF img 的屬性需要修正 fs-->
                <div class="col-8 container ItemFrame mt-4" v-if="Show" :key="Refresh">
                  <div class="Charpter mb-4 px-0" v-for="items in ShowInfo[SelectedChapter].Section" v-if="ShowInfo">
                  <div>
                      <h5 class="card-title mb-3">{{ items.Title }}</h5>
                      <div class="row GameCardGroup" style="overflow-x: auto;">
                        <div class="row">
                          <div v-for="item in items.Games" class="col-12 col-md-6 col-lg-4 d-flex align-self-stretch">
                            <div class="card GameCard my-2">
                              <div class="card-body">
                                <img src="@/assets/images/pics/cover_info.jpeg" class="card-img-top" alt="...">
                                <router-link :to="{ name: 'Game', params: { id: item.id, Grade: this.ShowGrade, Subject: this.Subject ,GameName: item.Name} }">
                                  <p class="h5 card-title mt-2">{{ item.Name }}</p>
                                </router-link>
                                <p class="card-text">{{ item.Description }}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                  </div>
                </div>
            </div>
        </div> 
    </section>
</template>

<script type="Model">
import fetchJson from '@/utilitys/fetch-json.js';
export default {
  data() {
    return {
      ShowMenu: true,
      ShowContent : false,
      ShowGrade: 0,
      Subject: "", //預設科目
      ShowInfo: {},
      MathShowInfo: null,//準備渲染的資料
      ChineseShowInfo: null,
      TechnologyShowInfo: null,
      Subjects:{
        Math: "數學",
        Chinese: "國語",
        Technology: "多元科技",
      },
      SelectedChapter: null,
      Show:false,
      Refresh: 0,
      //定義科目種類
    };
  },
  created() {
    // 在這裡你可以存取 this.$route.params.id
    this.ShowGrade = this.$route.params.id;
    (async () => {
      var res = await fetchJson("./Grade"+this.ShowGrade+"/MathGrade"+this.ShowGrade+".json");
      this.MathShowInfo = res.data;
      res = await fetchJson("./Grade"+this.ShowGrade+"/ChineseGrade"+this.ShowGrade+".json");
      this.ChineseShowInfo = res.data;
      res = await fetchJson("./Grade"+this.ShowGrade+"/TechnologyGrade"+this.ShowGrade+".json");
      this.TechnologyShowInfo = res.data;
      console.log(this.MathShowInfo,this.ChineseShowInfo,this.TechnologyShowInfo);
      this.ShowInfo = this.MathShowInfo; //預設科目
      console.log(this.ShowInfo);
    })();
  },
  methods: {
    SelectChapter(key){
      this.SelectedChapter = String(key);
      // sessionStorage.setItem("SelectedChapter", this.SelectedChapter);
      // console.log(this.SelectedChapter);
      this.Show = true;
    },
    ChangeSubject(_Subject){
      sessionStorage.setItem("Subject", _Subject);
      this.ShowContent = true;
      this.ShowMenu = false;
      this.Subject = _Subject;
      if (_Subject == "Math")
      {
        this.ShowInfo = this.MathShowInfo;
      }
      else if (_Subject == "Chinese")
      {
        this.ShowInfo = this.ChineseShowInfo;
      }
      else if (_Subject == "Technology")
      {
        this.ShowInfo = this.TechnologyShowInfo;
      }
      this.Refresh += 1;
      this.Show = false;
      this.$forceUpdate();
      console.log("change to ",this.Subject);
    }
  },
}
</script>

<style lang="scss" scoped>

header{
  background-color: #F19C79;
}
.navbar {
  background-color: #F19C79; 
  height: 10vh; 
  .navbar-brand {
    img{
        max-width: 70%
    }
  }
  img {
    max-width: 80%;
  }
}

.ItemFrame {
  height: 83dvh;
  overflow-y: scroll;
  // -ms-overflow-style: none; /* IE/Edge */
  &::-webkit-scrollbar {
    display: none;
  }
}
.SideBar {
  height: 83dvh;
  overflow-y: scroll;
  // -ms-overflow-style: none; /* IE/Edge */
  &::-webkit-scrollbar {
    display: none;
  }
}
.GameCardGroup{
  // -ms-overflow-style: none; /* IE/Edge */
  &::-webkit-scrollbar {
    display: none;
  }
}
section{
  height: 90vh;
  background-color: #FFFF;
}

.breadcrumb .breadcrumb-item {
  a {
    color: #000; /* 替換為你想要的顏色 */
    font-size: 1.2em;
  }

}

.GameCard {
  transition: transform 0.3s ease; /* 平滑過渡效果 */
}

.GameCard:hover {
  transform: scale(1.07); /* 當滑鼠懸停時放大 5% */
}

.nav-link{
  transition: transform 0.3s ease; /* 平滑過渡效果 */
}

.Subject_container{
  img:hover{
    transform: scale(1.1);
  }
  img{
    transition: transform 0.3s ease; /* 平滑過渡效果 */
  }
}
</style>