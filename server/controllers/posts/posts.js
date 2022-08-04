import * as postRepsitory from "../../services/post.js";

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