<template>
    <header>
      <nav class="container navbar navbar-expand-lg navbar-light sticky-top justify-content-center" style="justify-content: flex-start !important;">
          <a class="navbar-brand mt-2 mb-2" href="#" alt="Home">
              <img src="@/assets/images/nav_bar/logo.png" class="img-fluid" />
          </a>
          <div class="container sticky-top" style="--bs-breadcrumb-divider:'>';">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item"><i class="bi bi-house"></i><a href="#">  主頁</a></li>
              <li class="breadcrumb-item" aria-current="page"><i class="bi bi-book-half"></i>  <router-link :to="{ name: 'GameSelect', params:{ id:this.Grade }}">  {{ this.Grade }}  年級 {{ Subjects[Subject] }}</router-link></li>
              <li class="breadcrumb-item active" aria-current="page"><i class="bi bi-pen"></i><a>  {{this.Name}}</a></li>
            </ol>
          </div>     
      </nav>
    </header>
    <section>
      <div class="container-fluid">
        <div class="row mt-3 justify-content-center">
          <div class="col-8 GameArea">
            <div class="row levelbutton">
              <div class="d-grid gap-2 d-md-flex justify-content-center mb-3 levebar" style="width: 100;">
                <button type="button" class="btn btn-primary" disabled>關卡</button>
                <div v-for="(i, key) in GameConfig.Questions" :key="key" class="grid-item">
                  <button type="button" class="btn btn-primary w-auto" @click="changelevel(key+1)">{{ key+1 }}</button>
                </div>
                <button type="button" class="btn btn-primary" disabled v-if="GameStatus=='Progressing'">時間 : {{ time }}</button>
              </div>
            </div>
            <div class="row Game_Component">
                <!-- Dynamic import component -->
                <component
                    :if="GameType!='SelfDefine'"
                    :is="GameData.GameType" 
                    :id="GameID"
                    :GameData="GameData[Nowlevel-1]" 
                    :GameConfig="GameConfig"
                    @add-record="GameDataRecord"
                    @play-effect="EffectPlayer"
                    @next-question="NextQuestion">
                </component>
               
                <component
                    :if="GameType=='SelfDefine'"
  
                    :is="GameData.GameType"
                    :id="GameID"
                    :GameData="GameData[Nowlevel-1]" 
                    :GameConfig="GameConfig"
                    :EnviromerntInfo="GetAllInfo()"
  
                    @add-record="GameDataRecord"
                    @download-data="tocsv"
                    
                    @play-effect="EffectPlayer"
                    
                    @next-question="NextQuestion"
                    @previous-question="PreviousQuestion"
                    @change-level="changelevel"
  
                    @start-game="StartGame"
                    @reload-page="reloadPage"
                    @change-status="ChangeGameStatus"
  
                    @timer-start="startTimer"
                    @timer-pause="pauseTimer"
                    @timer-reset="resetTimer"
                    
                    >
                </component> 
            </div>
          </div>
          <div class="col-3 card SideBar">
              <p class="card-title h4 mt-3">功能區</p>
              <div class="card-body" style="border-style: none;">
                <div class="list-group mt-1">
                  <a class="list-group-item" @click="PreviousQuestion()"><img src="@/assets/buttonV3/previous.png" class="img-hover-zoom"></a>
                  <a class="list-group-item" @click="NextQuestion()"><img src="@/assets/buttonV3/next.png" class="img-hover-zoom"></a>
                  <a class="list-group-item" v-if="GameStatus=='Progressing'"><img src="@/assets/buttonV3/submit.png" class="img-hover-zoom"></a>
                  <a class="list-group-item" @click="StartGame()" v-if="GameStatus=='NotStart'"><img src="@/assets/buttonV3/start.png" class="img-hover-zoom"></a>
                  <a class="list-group-item" @click="reloadPage()" v-if="GameStatus=='Progressing'|| 'Done'"><img src="@/assets/buttonV3/restart.png" class="img-hover-zoom"></a>
                  <a class="list-group-item" v-if="GameStatus=='Progressing'"><img src="@/assets/buttonV3/hint.png" class="img-hover-zoom"></a>
                  <a class="list-group-item" @click="tocsv(this.download_data)" v-if="GameStatus=='Done'" ><img src="@/assets/buttonV3/download.png" class="img-hover-zoom"></a>
                  <a class="list-group-item" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="@/assets/buttonV3/info.png" class="img-hover-zoom"></a>
                  <a class="list-group-item"><img src="@/assets/buttonV3/calculator.png" class="img-hover-zoom"></a>
                  <a class="list-group-item"><img src="@/assets/buttonV3/record.png" class="img-hover-zoom"></a>
                </div>
                
                <!-- Temp check box
                For Switch Game Status
                <select v-model="GameStatus">
                  <option value="">請選擇一個選項</option>
                  <option value="NotStart">NotStart</option>
                  <option value="Progressing">Progressing</option>
                  <option value="Done">Done</option>
                </select> -->
            </div>
          </div>
          <div class="testcontrolpanel">
              <button type="button" v-on:click="EffectPlayer('CorrectSound')">CorrectSound</button>
              <button type="button" v-on:click="EffectPlayer('WrongSound')">WrongSound</button>
              <button type="button" v-on:click="EffectPlayer('FireWorkAnimation')">FireWorkAnimation</button>
          </div>
          
          <img :src="EffectSrc" v-if="EffectWindow" id="Effects">
            <!--Modal -->
              <div class="fade modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">不會玩嗎?請看教學影片:</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body justify-content-center">
                    <img src="@/assets/images/game_images/elephant.gif">
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">我知道了!</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>    
    </section>
  </template>
  
  <script>
  import fetchJson from '@/utilitys/fetch-json.js';
  import * as Arr2CSV from '@/utilitys/array2csv.js';
  import { formToJSON } from 'axios';
  
  
  export default {
    data() {
      return {
        GameType: "",
        GameStatus: "NotStart", //遊戲狀態
        download_data: [], //下載的資料，格式為二維陣列。
        GameID: "",
        Subject: "",
        Grade: "",
        Name: "",
        Nowlevel : 1,
        Subjects: {
            Math: "數學",
            Chinese: "國語",
            Technology: "多元科技",
        },
        GameConfig: {},
        GameData: {},
        time: 0,
        intervalId: null,
        EffectWindow: false,
        EffectSrc:'',
        // SentData2ChildComponent: {},
      };
    },
    created() {
        this.GameID = this.$route.params.id;
        this.Subject = this.$route.params.Subject;
        this.Grade = this.$route.params.Grade;
        this.Name = this.$route.params.GameName;
        (async () => {
            const res = await fetchJson("./Grade"+this.Grade+"/"+this.GameID+".json");
            console.log(res);
            this.GameData = res.data;
            // this.GameType = this.GameData.GameType;
        })();
        
    },
    mounted() {
      // this.GameType = this.GameData.GameType;
      // console.log(this.GameType);
      console.log(this.GameData.GameType);
    },
    methods: {
        
        ChangeGameStatus(status) {
          //改變遊戲狀態
          this.GameStatus = status;
        },
        StartGame() {
            this.GameStatus = "Progressing";
            this.startTimer();
            this.dataPreprocess();
        },
        tocsv(data) {
            //Get Data From Component
            console.log(data);
            array2csv(data);
        },
        reloadPage() {
          location.reload();
        },
        changelevel(change2level) {
          
          if (change2level > this.GameConfig.TotalLevel || change2level < 1) {
            console.log("The level is out of range")
          }
          else{
            this.Nowlevel = change2level;
            this.pauseTimer();
            //FIXME 傳資料進入CSV
            this.resetTimer();
          }
          
        },
        NextQuestion() {
          if (this.Nowlevel < this.GameConfig.TotalLevel) {
            this.Nowlevel++;
          }
          this.pauseTimer();
          //FIXME 傳資料進入CSV
          this.resetTimer();
        },
        PreviousQuestion() {
          if (this.Nowlevel > 1) {
            this.Nowlevel--;
          } 
          this.pauseTimer();
          //FIXME 傳資料進入CSV
          this.resetTimer();
        },
        startTimer() {
          console.log("timer is started")
          if (this.intervalId) {
            return;
          }
          this.intervalId = setInterval(() => {
            this.time++;
          }, 1000);
        },
        pauseTimer() {
          clearInterval(this.intervalId);
          this.intervalId = null;
        },
        resetTimer() {
          this.pauseTimer();
          this.time = 0;
        }
        ,
        GameDataRecord(data) {
          //紀錄遊戲資料
          console.log("Game Data Record");
        },
        EffectPlayer(type) {
          //播放音效
          console.log("Play Effect, type: "+type);
            switch (type) {
                case "CorrectSound":
                    var sound = new Audio()
                    sound.src = new URL(`../assets/Effects/CorrectAnswer.mp3`, import.meta.url).href
                    sound.oncanplaythrough = function(){
                      sound.play();
                    }
                    break;
                case "WrongSound":
                    var sound = new Audio();
                    sound.src = new URL(`../assets/Effects/WrongAnswer.mp3`, import.meta.url).href
                    sound.oncanplaythrough = function(){
                      sound.play();
                    }
                    break;
                case "FireWorkAnimation":
                    this.EffectWindow = true;
                    this.EffectSrc = new URL(`../assets/Effects/Firework.gif`, import.meta.url).href;
                    var sound = new Audio();
                    sound.src = new URL(`../assets/Effects/WrongAnswer.mp3`, import.meta.url).href
                    sound.oncanplaythrough = function(){
                      sound.play();
                    }
                    setInterval(() => {
                      this.EffectWindow = false;
                    }, 2000);
                    break;
            }
        },
        GetAllInfo() {
          return{
            Subject: this.Subject,
            Grade: this.Grade,
            Name: this.Name,
            GameID: this.GameID,
            GameType: this.GameType,
            GameConfig: this.GameConfig,
            GameData: this.GameData,
            GameStatus: this.GameStatus,
            Nowlevel: this.Nowlevel,
            time: this.time,
            intervalId: this.intervalId,
            EffectWindow: this.EffectWindow,
            EffectSrc: this.EffectSrc,
            
          }
        }
      },
    components: {
        TrueFalseGame: () => import('@/views/GameTemplate/TrueFalseGame.vue'),
        SelectGame: () => import('@/views/GameTemplate/SelectGame.vue'),
        NumberInputGame: () =>import('@/views/GameTemplate/NumberInputGame.vue'),
        ClassifyGame: () => import('@/views/GameTemplate/ClassifyGame.vue'),
        SortGame: () => import('@/views/GameTemplate/SortGame.vue'),
        FindTheItemGame:() => import('@/views/GameTemplate/FindTheItemGame.vue'),
        AutoNumberingGame: () => import('@/views/GameTemplate/AutoNumberingGame.vue'),
        NumberingGame:()=>import('@/views/GameTemplate/NumberingGame.vue'),
    }
  }
  </script>
  <style scoped lang="scss">
  header{
  background-color: #F19C79;
  height: 10vh;
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
  .sidebar {
  height: 80vh;
  }
  
  .img-hover-zoom {
  transition: transform 0.3s ease; /* 平滑的過渡效果 */
  }
  
  .img-hover-zoom:hover {
  transform: scale(1.07); /* 放大至原大小的 110% */
  }
  
  
  .breadcrumb .breadcrumb-item {
  a {
    color: #FFF; /* 替換為你想要的顏色 */
    font-size: 1.2em;
  }
  }
  .img-hover-zoom {
  max-width: 100%; /* 或者是卡片寬度的百分比 */
  height: auto; /* 保持圖片的比例 */
  }
  .list-group {
  border: none !important; /* 移除邊框 */
  }
  .list-group-item {
  border: none !important; /* 移除每個 list-group-item 的邊框 */
  }
  /* 如果按鈕內有圖片，也要確保圖片不會超出按鈕的寬度 */
  .function-btn img {
  max-width: 100%;
  height: auto; /* 保持圖片的比例 */
  }
  .levebar{
  overflow-x: scroll;
  }
  .GameArea {
  background-color: #fff;
  border-radius: 10px;
  // border: #000 1px solid;
  height: 85vh;
  }
  // .Game_Component {
  //   height: vh !important;
  // }
  .levelbutton {
  button{
    width: 100px !important;
  }
  }
  #Effects {
    position: absolute;
    top: 0;
    left: 0;
    width: autos;
    height: 100vh;
  }
  </style>
  
  