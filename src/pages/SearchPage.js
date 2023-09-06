import ResultItem from "../components/ResultItem.js";
import Component from "../core/Component.js";
import Filter from "../components/Filter.js";
import Header from "../components/Header.js";
import Pagination from "../components/Pagination.js";
import Navigator from "../components/Navigator.js";
import Footer from "../components/Footer.js";
import api from "../api.js";

/* 호출 시 아래와 같은 형식의 props를 넘겨주어야 합니다. 
  {method:"category",keyword:"국/찌개||일품||반찬||후식||기타"} or 
  {method:"search",keyword:"검색단어"}

  검색 단어 ex) 치킨, 국수, 샐러드 등 사용자 입력

  method를 다르게 설정한 이유는 api에서 해당 데이터를 가져올 때 작성하는 쿼리와 함수가 다르기 때문
*/
export default class SearchPage extends Component {
  setup() {
    const category = history.state.category;
    const keyword = history.state.keyword;
    this.$state = {category: category, keyword: keyword, items: []};
  }

  template() {
    return /*html*/ `
    <style>
      .SearchPage{
        margin: 0 auto;
        border: 1px solid #eaeaea;
        width:480px;
        left:50%;
        display:flex;
        flex-direction:column;
        align-items:center;
      }
      .orange {
        color:orange;
      }
      .SearchPage_top{
        width:100%;
        display:flex;
        justify-content:space-between;
      }
    </style>
      <div class="SearchPage px-3">
      <div id="header"></div>
      <div id="nav"></div>
      <section class="SearchPage_top">
      <div id="filter"></div>
      </section>
      <div class="spinner-border my-5" role="status"></div>
      <div id="resultItemContainer"></div>
      <div id="paginationContainer"></div>
      <div id="footer"></footer>
      </div>
  `;
  }

  mounted() {
    const fetchFunc = async (type) => {
      let result;
      switch(type) {
        case 'all' : {
          result = await api.fetchFoodAll();
          break;
        }
        case 'keyword' : {
          result = await api.fetchFoodByKeyword(this.$state.keyword);
          break;
        }
        case 'category' : {
          result = await api.fetchFoodByCategory(this.$state.category);
          break;
        }
        default : {
          result = await api.fetchFoodByCategoryAndKeyword(this.$state.category, this.$state.keyword);
        }
      }
      if (result) {
        await result.forEach((item) => this.$state.items.push(item));
      } else {
        console.log("error");
      }
      await this.$state.items.forEach((obj) => {
        const item = document.createElement("div");
        new ResultItem(item, obj);
        resultItemContainer.append(item);
      });

      const spinner = document.querySelector('.spinner-border');
      spinner.remove();
      
      const $searchPageTop = this.$target.querySelector(".SearchPage_top");
      const $resultBlock = document.createElement("div");
      
      const $resultText = document.createTextNode(`${this.$state.items.length}개의 ${this.$state.category} > ${this.$state.keyword} 레시피가 있어요`);
      $resultBlock.appendChild($resultText);
      $searchPageTop.prepend($resultBlock);

      const $pagination = this.$target.querySelector("#paginationContainer");
      new Pagination($pagination)
      const $filter = this.$target.querySelector("#filter");
      new Filter($filter);
    }
  if(this.$state.category === '전체') {
    if(this.$state.keyword ===  '') fetchFunc('all');
    else fetchFunc('keyword')
  }
  else {
    if(this.$state.keyword === '') fetchFunc('category')
    else fetchFunc();
  }

  const $header = this.$target.querySelector("#header");
  new Header($header, {page: "search", category: history.state.category, keyword: history.state.keyword});
  const $nav = this.$target.querySelector("#nav");
  new Navigator($nav);

  const resultItemContainer = this.$target.querySelector(
    "#resultItemContainer"
  );

  const $footer = this.$target.querySelector("#footer");
  new Footer($footer);
  }
}