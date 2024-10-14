import Router from "./Router.js";
import Component from "./core/Component.js";
import createPages from "./pages/index.js";
import Footer from "./components/Footer.js";

export default class App extends Component {
  template() /*html*/ {
    return `
    <main>

    </main>
    <footer></footer>
    `;
  }

  mounted() {
    const $main = this.$target.querySelector("main");
    const pages = createPages($main);
    const id = [...Array(3367).keys()].map((i) => i);

    const router = new Router($main);
    router.addRoute("#", pages.landing);
    router.addRoute("#category", pages.category);
    router.addRoute("#search", pages.search);
    router.addRoute("#temp", pages.temp);
    router.addRoute("#bookmark", pages.bookmark);
    id.forEach((item) => router.addRoute(`#detail/${item}`, pages.detail));
    router.start();

    new Footer(this.$target.querySelector("footer"));
  }
}
