import Post from "../models/post.js";

const EXCEPT_OPTION = { purport: 0, contents: 0, attachments: 0, comments: 0 }; // 필요없는 컬럼 삭제하기 위한 변수

const setSortOptions = async (sortby) => {
  // sortby 조건에 따라 옵션 설정
  try {
    let sortOptions;
    if (sortby === "최신순") {
      sortOptions = { updatedAt: -1 };
    } else if (sortby === "마감임박순") {
      sortOptions = { updatedAt: 1 };
    } else if (sortby === "찬성순") {
      sortOptions = { agrees: -1 };
    } else if (sortby === "반대순") {
      sortOptions = { disagrees: -1 };
    }

    return sortOptions;
  } catch (err) {
    console.log(err);
  }
};

const getPostsList = async (page, search, sortOptions, pageSize) => {
  // Post.find() 함수 선언
  try {
    return Post.find(
      {
        title: {
          $regex: search,
        },
      },
      EXCEPT_OPTION
    )
      .sort(sortOptions)
      .skip(pageSize * (Number(page ? page : 1) - 1))
      .limit(pageSize)
      .exec();
  } catch (err) {
    console.log(err);
  }
};

const getByCategory = async (postsList, categoryArr) => {
  // 카테고리 검색 함수 선언
  try {
    return Promise.all(
      postsList.map(async (post) => {
        let posts;
        const { category } = post;
        for (let type of category) {
          for (let category of categoryArr) {
            if (type === category) {
              posts = await Post.find(
                {
                  category: {
                    $in: type,
                  },
                },
                EXCEPT_OPTION
              );
              return posts;
            } else {
              return false;
            }
          }
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
};

const getClosed = async (postsList, posts) => {
  // 마감된 발의문 분류 함수 선언
  try {
    return Promise.all(
      postsList.map(async (post) => {
        const { updatedAt } = post;
        const date = new Date(updatedAt);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const afterOneMonth = new Date(year, month + 1, day);

        afterOneMonth.getTime() < new Date().getTime()
          ? posts.push(post)
          : null;
      })
    );
  } catch (err) {
    console.log(err);
  }
};

export const getAllByCategory = async (categoryArr, search, sortby, page) => {
  try {
    const pageSize = 15;
    const sortOptions = await setSortOptions(sortby);
    const postsList = await getPostsList(page, search, sortOptions, pageSize);

    return await getByCategory(postsList, categoryArr);
  } catch (err) {
    console.log(err);
  }
};

export const getClosedAllByCategory = async (
  categoryArr,
  search,
  sortby,
  page
) => {
  try {
    const posts = [];
    const pageSize = 15;
    const sortOptions = await setSortOptions(sortby);
    const postsList = await getPostsList(page, search, sortOptions, pageSize);

    const listWithCategory = await getByCategory(postsList, categoryArr);
    const filteredList = listWithCategory.filter((el) => el !== false);

    await getClosed(filteredList[0], posts);

    return posts;
  } catch (err) {
    console.log(err);
  }
};

export const getSearchedTitleBySorting = async (search, sortby, page) => {
  try {
    const pageSize = 15;
    const sortOptions = await setSortOptions(sortby);

    return await getPostsList(page, search, sortOptions, pageSize);
  } catch (err) {
    console.log(err);
  }
};

export const getClosedSearchedTitleBySorting = async (search, sortby, page) => {
  try {
    const posts = [];
    const pageSize = 15;
    const sortOptions = await setSortOptions(sortby);
    const postsList = await getPostsList(page, search, sortOptions, pageSize);

    await getClosed(postsList, posts);

    return posts;
  } catch (err) {
    console.log(err);
  }
};