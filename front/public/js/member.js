import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";
import { createEleClass, addTextNode, addChild, makeSkillTag } from "./components/utils.js";
import { getPost } from "./api/dummy/index.js";

//DOM elements
const body = document.querySelector("body");
const header = makeHeader();
const footer = makeFooter();
const main = document.querySelector("#main");
const section = document.querySelector("#main section");

// Header, footer append
body.insertBefore(header, main);
body.insertBefore(footer, document.querySelector("script"));

const pathname = window.location.pathname.split("/");
const currentPostId = pathname[pathname.length - 1];

// get user data
window.onload = (function () {
  const post = getPost(currentPostId).data.post;
  const members = post.members;
  addTextNode(document.querySelector(".group-title"), `${post.title}`);
  for (let i = 0; i < members.length; i++) {
    makeMemberCard(members[i]);
  }
})();

// 멤버 카드 생성 함수
function makeMemberCard(user) {
  const article = createEleClass("article", "flex-item");
  const memberName = createEleClass("p", "member-name"); // 회원 이름
  const memberEmail = createEleClass("p", "email"); // 회원 이메일

  addChild(article, memberName, user.nickname);
  for (let i = 0; i < user.tags.length; i++) {
    article.appendChild(makeSkillTag(user.tags[i]));
  }
  addChild(article, memberEmail, user.email);

  section.appendChild(article);
}
