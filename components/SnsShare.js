import Component from "../core/Component.js";

export default class SnsShare extends Component {
  setup() {
    this.setState(this.$props);
  }

  template() {
    return /*html*/ `
  <style>
    .SnsShare {
        display: flex;
        justify-content: center;
        gap: 5px;
    }

    .SnsShare_shareElem {
        display: flex;
        flex-direction: column;
        cursor: pointer;
    }

    .SnsShare_shareElem>img {
        width: 50px;
    }

    .SnsShare_shareElem>span {
        font-size: 10px;
        font-weight: bold;
        text-align: center;
    }
</style>
<body>
<div class="SnsShare mt-2 mb-4">
    <div class="SnsShare_shareElem linkCopy"><img src="./img/copy.png" /><span>링크복사</span></div>
    <div class="SnsShare_shareElem kakaoShare"><img src="./img/kakao-talk.png" /><span>카카오톡</span></div>
    <div class="SnsShare_shareElem twitterShare"><img src="./img/twitter.png" /><span>트위터</span></div>
    <div class="SnsShare_shareElem facebookShare"><img src="./img/facebook.png" /><span>페이스북</span></div>
</div>
</body>`;
  }

  mounted() {
    this.$target.querySelector(".linkCopy").addEventListener("click", () => {
      window.navigator.clipboard.writeText(window.location).then(() => {
        alert("링크가 복사되었습니다.");
      });
    });
    this.$target.querySelector(".kakaoShare").addEventListener("click", () => {
      console.log(window.location.href);
      Kakao.Share.sendCustom({
        templateId: 98215,
        templateArgs: {
          PATH: window.location.href,
          title: this.$state.RCP_NM.toString(),
          description: `오늘은 내가 ${this.$state.RCP_NM} 요리사🍴`,
          img_1: this.$state.ATT_FILE_NO_MAIN,
          img_2: this.$state.MANUAL_IMG01,
          img_3: this.$state.MANUAL_IMG02,
        },
      });
    });

    this.$target
      .querySelector(".twitterShare")
      .addEventListener("click", () => {
        const sendText = `오늘은 내가 ${this.$state.RCP_NM} 요리사🍽️ 아래 링크를 클릭하여 레시피를 확인해보세요!`;
        const pageUrl =
          "https://5242-218-51-9-60.ngrok-free.app/src/#/detail/28";
        window.open(
          `https://twitter.com/intent/tweet?text=${sendText}&url=${pageUrl}`
        );
      });

    this.$target
      .querySelector(".facebookShare")
      .addEventListener("click", () => {
        const pageUrl = window.location;
        window.open(`http://www.facebook.com/sharer/sharer.php?u=${pageUrl}`);
      });
  }
}
