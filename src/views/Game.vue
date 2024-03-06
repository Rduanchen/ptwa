<template>
  <header>
    <nav class="container-fluid navbar navbar-expand-md navbar-light sticky-top justify-content-around justify-content-md-center" style="justify-content: flex-start !important;">
      <!-- <nav class="container navbar navbar-expand-md sticky-top justify-content-around" style="width: 100%;"> -->
        <a class="navbar-brand mx-3" href="#" alt="Home">
            <img src="@/assets/images/nav_bar/logo.png"  />
        </a>
        <button class="navbar-toggler btn btn-primary mx-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText11" aria-controls="navbarText11" aria-expanded="false" aria-label="Toggle navigation">
          <router-link :to="{ name: 'GameSelect', params:{ id:this.Grade }}">上一頁</router-link>
        </button>
        <div class="collapse navbar-collapse mx-3" id="navbarText" >
          <div class="container sticky-top d-flex justify-content-end" style="--bs-breadcrumb-divider:'>';" >
            <ol class="breadcrumb mb-0 ">
              <li class="breadcrumb-item"><i class="bi bi-house"></i><a href="#">  主頁</a></li>
              <li class="breadcrumb-item" aria-current="page"><i class="bi bi-book-half"></i>  <router-link :to="{ name: 'GameSelect', params:{ id:this.Grade }}">  {{ this.Grade }}  年級 {{ Subjects[Subject] }}</router-link></li>
              <li class="breadcrumb-item active" aria-current="page"><i class="bi bi-pen"></i><a>  {{this.Name}}</a></li>
            </ol>
          </div>
        </div>
    </nav>
  </header>
  <section>
    <div class="container-fluid">
      <div class="row mt-3 justify-content-center">
        <div class="col-9 GameArea">
          <div class="row levelbutton d-sm-none d-md-block d-none d-sm-block" v-if="GameStatus=='Progressing'">
            <div class="d-grid gap-2 d-flex justify-content-center mb-3 levebar">
              <button type="button" class="btn btn-primary flex-fill text-nowrap" disabled>關卡</button>
              <div v-for="(i, key) in GameData.Questions" :key="key" class="grid-item flex-fill d-flex justify-content-between">
                <!-- <button type="button" class="btn btn-primary w-auto" @click="changelevel(key+1)">{{ key+1 }}</button> -->
                <button type="button" class="btn btn-primary flex-fill" @click="changelevel(key+1)" >{{ key+1 }}</button>
              </div>
              <button type="button" class="btn btn-primary flex-fill text-nowrap" disabled v-if="GameStatus=='Progressing'">時間 : {{ time }}</button>
            </div>
          </div>
          <div class="row Game_Component">
              <!-- Dynamic import component -->
            <div class="games" v-if="GameStatus=='Progressing'">
              <component
                v-if="GameType!='SelfDefine'"
                v-bind:is="this.GameType" 
                :id="this.GameID" 
                :GameData="this.GameData.Questions[this.Nowlevel-1]"   
                :GameConfig="this.GameConfig"  
                @add-record="GameDataRecord"  
                @play-effect="EffectPlayer"  
                @next-question="NextQuestion">
              </component>
                               
              <component
                  v-if="GameType=='SelfDefine'"

                  :is="GameData.GameType"
                  :id="GameID"
                  :GameData="GameData[Nowlevel-1]" 
                  :GameConfig="GameConfig"
                  :EnviromerntInfo="GetAllInfo()"
                  @get-info="GetAllInfo"

                  @add-record="GameDataRecord"
                  @download-data="ToCSV"
                  @config-header="ConfigHeader"
                  
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
            <div class="intro" v-else>
              <GameStartandOver :Status="GameStatus" :GameName="Name" @start-game="StartGame" @download-record="ToCSV" @restart="reloadPage" @previous-page="PreviousPage"></GameStartandOver>
              <!-- FIXME intro 還沒有加進來 -->
            </div>
          </div>
        </div>
        <div class="col-2 SideBar d-flex flex-column justify-content-center d-sm-none d-md-block d-none d-sm-block">
          <p class="card-title h3 mt-3 mb-3 text-center">功能區</p>
          <div class="card">
            <div class="card-body d-flex flex-column justify-content-center d-grid gap-3 my-1" style="">
              <button class="btn btn-primary text-nowrap img-hover-zoom" @click="PreviousQuestion()">
                <div class="d-flex align-items-center">
                  <div class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                    </svg>
                  </div>
                  <div class="mx-auto" >
                    上一關
                  </div>
                </div>
              </button>
              <button class="btn btn-primary text-nowrap img-hover-zoom" @click="NextQuestion()">
                <div class="d-flex align-items-center">
                  <div class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                    </svg>
                  </div>
                  <div class="mx-auto">
                    下一關
                  </div>
                </div>
              </button>
              <button class="btn btn-primary text-nowrap img-hover-zoom" @click="StartGame()" v-if="GameStatus=='NotStart'">
                <div class="d-flex align-items-center">
                  <div class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-skip-start-fill" viewBox="0 0 16 16">
                      <path d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.232.696v7.384c0 .63-.692 1.01-1.232.697L5 8.753V12a.5.5 0 0 1-1 0z"/>
                    </svg>
                  </div>
                  <div class="mx-auto">
                    開始
                  </div>
                </div>
              </button>
              <button class="btn btn-primary text-nowrap img-hover-zoom" @click="reloadPage()">
                <div class="d-flex align-items-center">
                  <div class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                    </svg>
                  </div>
                  <div class="mx-auto">
                    重新開始
                  </div>
                </div>
              </button>
              <button class="btn btn-primary text-nowrap img-hover-zoom" v-if="GameStatus=='Progressing'" >
                <div class="d-flex align-items-center">
                  <div class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square-fill" viewBox="0 0 16 16">
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                    </svg>
                  </div>
                  <div class="mx-auto">
                    提示
                  </div>
                </div>
              </button>
              <button class="btn btn-primary text-nowrap img-hover-zoom" @click="ToCSV(this.download_data)" v-if="GameStatus=='Done'">
                <div class="d-flex align-items-center">
                  <div class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
                      <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                    </svg>
                  </div>
                  <div class="mx-auto">
                    下載
                  </div>
                </div>
              </button>
              <button class="btn btn-primary text-nowrap img-hover-zoom" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div class="d-flex align-items-center">
                  <div class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-question-fill" viewBox="0 0 16 16">
                      <path d="M5.933.87a2.89 2.89 0 0 1 4.134 0l.622.638.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01zM7.002 11a1 1 0 1 0 2 0 1 1 0 0 0-2 0m1.602-2.027c.04-.534.198-.815.846-1.26.674-.475 1.05-1.09 1.05-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.7 1.7 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745.336 0 .504-.24.554-.627"/>
                    </svg>
                  </div>
                  <div class="mx-auto">
                    教學
                  </div>
                </div>
              </button>
              <button class="btn btn-primary text-nowrap img-hover-zoom">
                <div class="d-flex align-items-center">
                  <div class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calculator" viewBox="0 0 16 16">
                      <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                      <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                  </div>
                  <div class="mx-auto">
                    計算紙
                  </div>
                </div>
              </button>
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
        <!-- <div class="testcontrolpanel">
            <button type="button" v-on:click="EffectPlayer('CorrectSound')">CorrectSound</button>
            <button type="button" v-on:click="EffectPlayer('WrongSound')">WrongSound</button>
            <button type="button" v-on:click="EffectPlayer('FireWorkAnimation')">FireWorkAnimation</button>
        </div>
        <div class="box">
            {{ download_data }}
        </div> -->
        
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
import loading from '@/components/loading.vue';
import GameStartandOver from '@/components/GameStartandOver.vue';
// import TrueFalseGame from '@/views/GameTemplate/TrueFalseGame.vue';
import axios from 'axios';
import {defineAsyncComponent} from 'vue';


export default {
  data() {
    return {
      GameType: "loading",
      GameStatus: "NotStart", //遊戲狀態
      download_data: [[]], //下載的資料，格式為二維陣列。
      header: [],
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
      totaltime: 0,
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
      axios.get(`../../Grade${this.Grade}/${this.GameID}.json`)
      .then((res) => {
        this.GameData = res.data;
        this.GameType = this.GameData.GameType;
        this.GameConfig = this.GameData.GameConfig;
      })
  },
  methods: {
      ChangeGameStatus(status) {
        //改變遊戲狀態
        this.GameStatus = status;
      },
      StartGame() {
          this.GameStatus = "Progressing";
          this.startTimer();
      },
      ConfigHeader(arr){
        this.header=arr;
      },
      ToCSV(data=this.download_data,defaultheader=true) {
        if (defaultheader) {
          let download = Arr2CSV.MadeCsvFile(this.GameID,this.Name,this.Grade,this.Subject,data,this.totaltime);
          Arr2CSV.DownloadCSV(download,this.Name);
        }
        else{
          let download = Arr2CSV.MadeCsvFile(this.GameID,this.Name,this.Grade,this.Subject,data,this.totaltime,this.header);
          Arr2CSV.DownloadCSV(download,this.Name);
        }
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
        if (this.Nowlevel < this.GameData.TotalLevel) {
          this.Nowlevel++;
        }
        else{
          this.GameStatus = "Done";
          this.EffectPlayer("FireWorkAnimation");
        }
        this.pauseTimer();
        this.totaltime += this.time;
        this.resetTimer();
        this.startTimer();
      },
      PreviousQuestion() {
        if (this.Nowlevel > 1) {
          this.Nowlevel--;
        } 
        this.pauseTimer();
        //FIXME 傳資料進入CSV
        this.resetTimer();
        this.startTimer();
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
      GameDataRecord(data,SelfDefine=false) {
        //紀錄遊戲資料
        // default ["正確答案","學生作答答案","是否正確","作答秒數(關卡)","作答秒數(總時間)"]
        // data格式[正確答案,學生作答答案,是否正確]
        let record = [];
        if (SelfDefine) {
          record = Arr2CSV.ArrayTemplate2Record(data,this.Nowlevel,this.time,this.totaltime)
          console.log("Self Define Game Data Record");
        }
        else{
          record = [data[0],data[1],data[2],this.time,this.totaltime,this.Nowlevel];
          console.log("Default Game Data Record: "+record);
        }
        try {
          this.download_data[this.Nowlevel-1].push(record);
        } catch (error) {
          this.download_data.push([]);
          this.download_data[this.Nowlevel-1].push(record);
        }
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
                  sound.src = new URL(`../assets/Effects/harry.mp3`, import.meta.url).href
                  sound.oncanplaythrough = function(){
                    sound.play();
                  }
                  setInterval(() => {
                    this.EffectWindow = false;
                  }, 3000);
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
      },
      PreviousPage() {
        this.$router.go(-1);
      }
    },
  components: {
      GameStartandOver,
      loading,
      TrueFalseGame: defineAsyncComponent(() => import('@/views/GameTemplate/TrueFalseGame.vue')),
      SelectGame: defineAsyncComponent(() => import('@/views/GameTemplate/SelectGame.vue')),
      NumberInputGame: defineAsyncComponent(() => import('@/views/GameTemplate/NumberInputGame.vue')),
      ClassifyGame: defineAsyncComponent(() => import('@/views/GameTemplate/ClassifyGame.vue')),
      SortGame: defineAsyncComponent(() => import('@/views/GameTemplate/SortGame.vue')),
      FindTheItemGame: defineAsyncComponent(() => import('@/views/GameTemplate/FindTheItemGame.vue')),
      AutoNumberingGame: defineAsyncComponent(() => import('@/views/GameTemplate/AutoNumberingGame.vue')),
      NumberingGame: defineAsyncComponent(() => import('@/views/GameTemplate/NumberingGame.vue')),
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
      @media (max-width: 576px){
        height: 7vh;
        width: auto;
      }
      @media (min-width: 576px){
        max-width: 20vw;
      }
    }
  }
  img {
    max-width: 80%;
  }
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
  // overflow-x: scroll; 
  &::-webkit-scrollbar {
    display: none;
  }
}
.GameArea {
  background-color: #fff;
  border-radius: 10px;
  // border: #000 1px solid;
  height: 85vh;
}
#Effects {
  position: absolute;
  top: 0;
  left: 0;
  width: autos;
  height: 100vh;
}
.SideBar{
  border-radius: 10px;
  height: 85vh;
  button{
    font-size: 2vw;
  }
  svg{
    width: 2vw;
    height: 2vw;
  }
}

.Game_Component{
  width: 75vw !important;
  height: 70vh !important;
}
</style>

