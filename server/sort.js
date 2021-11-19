const header = document.querySelector("header");
header.addEventListener("click", () => {
  location.href = "/";
});

const onClickDetailPage = (e) => {
  const target = e.querySelector("#hidden").innerText;
  console.log("target >> ", target);

  const payload = {
    _id: target,
  };

  axios.post("/api/board/detail", payload).then((res) => {}).catch;
};

const board = document.querySelector("#board");
const init = () => {
  axios
    .post("/api/board/getAll")
    .then((res) => {
      const data = res.data;
      console.log("data >> ", data);
      let html = "<Table>";
      data.board.map((v) => {
        html += `
                                <tr onclick="onClickDetailPage(this)">
                                    <td id="hidden">${v._id}</td>
                                    <td class="board-title">${v.title}</td>
                                    <td>${v.createdAt}</td>
                                 </tr>
                                `;
      });
      html += "</Table>";
      board.innerHTML = html;
    })
    .catch((err) => {
      console.error(err);
    });
};

init();
