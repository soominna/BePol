import * as postRepsitory from "../../services/post.js";
import cron from "node-cron";

export const getPostsList = async (req, res, next) => {
  /**
   * 기능: 법안 발의문 리스트 조회
   * 작성자: 이승연
   * 📌 쿼리별 게시글 리스트 조회 기능
   * 💡 query
   * 📍 category - 법률 카테고리 별 검색 ✔︎
   * 📍 sortby - 최신순, 마감임박순, 찬성순, 반대순 ✔︎
   * 📍 search - 검색 ✔︎
   * 📍 closed - 마감여부 ✔︎
   * 📍 page - 페이지당 게시물 개수 ✔︎
   * 📍 최적화 🔺 - 페이징 최적화 ❌
   */
  const { category, sortby, search, closed, page } = req.query;
  let data;
  try {
    // 카테고리 제외
    if (closed === "true") {
      // 마감 완료
      data = await postRepsitory.getClosedSearchedTitleBySorting(
        search,
        sortby,
        page
      );
    } else if (closed === "false") {
      // 마감 x
      data = await postRepsitory.getSearchedTitleBySorting(
        search,
        sortby,
        page
      );
    }

    // 카테고리 검색일 경우
    if (category) {
      const categoryArr = category.split(",");
      let filteredData;
      if (closed === "true") {
        data = await postRepsitory.getClosedAllByCategory(
          categoryArr,
          search,
          sortby,
          page
        );
        filteredData = data.filter((post) => post !== false);
      } else if (closed === "false") {
        data = await postRepsitory.getAllByCategory(
          categoryArr,
          search,
          sortby,
          page
        );
        filteredData = data.filter((post) => post !== false);
      }
      return res.status(200).json({
        data: filteredData[0],
      });
    }

    return res.status(200).json({
      data,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error!",
    });
  }
};

export const getThreePopularPostsList = async (req, res, next) => {
  /**
   * 기능: 게시판 hot3 리스트 조회 기능
   * 작성자: 이승연
   * - 메인페이지 hot3 게시글 기준 → 
   * 찬성 반대 비율 차이가 10퍼센트 미만인 글들 중에서 투표수가 많은 기준으로 3개 선정,
   * 만족하는 글이 3개 미만이면 비율 차이를 수정해서 다시 검색
   * db에 저장해 놓고 10분마다 업데이트(node-cron 라이브러리)
   */
   cron.schedule("59 23 1-31 * *", async () => {
    await postRepsitory.setThreePopularPosts();
  });

  const data = await postRepsitory.getThreePopularPosts();
  
  if (!data) {
    return res.status(404).json({
      message: "Data is not found!",
    });
  } else {
    return res.status(200).json({
      data,
    })
  }
};